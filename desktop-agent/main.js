// MnT Monitor — Electron main process.
// Captures the primary screen every 10 minutes (with the employee's knowledge:
// the window + tray clearly show tracking status) and uploads it to the MnT
// server. Sign-in uses the employee's MnT account.
const { app, BrowserWindow, ipcMain, Tray, Menu, desktopCapturer, screen, nativeImage } = require("electron");
const path = require("path");
const fs = require("fs");

const DEFAULT_SERVER = "https://mntfuture.com";
const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
const JPEG_QUALITY = 60;

let win = null;
let tray = null;
let timer = null;
let tracking = false;
let lastCapture = null;
let config = { serverUrl: DEFAULT_SERVER, token: null, name: null, code: null };

const cfgPath = () => path.join(app.getPath("userData"), "agent-config.json");
function loadConfig() {
  try {
    config = { ...config, ...JSON.parse(fs.readFileSync(cfgPath(), "utf8")) };
  } catch {
    /* first run */
  }
}
function saveConfig() {
  try {
    fs.writeFileSync(cfgPath(), JSON.stringify(config));
  } catch {
    /* ignore */
  }
}

function statusPayload() {
  return {
    loggedIn: !!config.token,
    tracking,
    name: config.name,
    code: config.code,
    serverUrl: config.serverUrl,
    lastCapture: lastCapture ? lastCapture.toISOString() : null,
  };
}
function pushStatus() {
  if (win && !win.isDestroyed()) win.webContents.send("status", statusPayload());
  updateTray();
}

async function captureAndUpload() {
  if (!config.token) return;
  try {
    const display = screen.getPrimaryDisplay();
    const scale = display.scaleFactor || 1;
    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: {
        width: Math.round(display.size.width * scale),
        height: Math.round(display.size.height * scale),
      },
    });
    if (!sources.length) return;
    const jpeg = sources[0].thumbnail.toJPEG(JPEG_QUALITY);
    const res = await fetch(`${config.serverUrl}/api/agent/screenshot`, {
      method: "POST",
      headers: {
        "Content-Type": "image/jpeg",
        Authorization: `Bearer ${config.token}`,
        "X-Captured-At": new Date().toISOString(),
      },
      body: jpeg,
    });
    if (res.status === 401 || res.status === 403) {
      stopTracking();
      config.token = null;
      saveConfig();
      pushStatus();
      return;
    }
    if (res.ok) {
      lastCapture = new Date();
      pushStatus();
    }
  } catch (e) {
    console.error("capture/upload failed:", e && e.message);
  }
}

function startTracking() {
  if (tracking || !config.token) return;
  tracking = true;
  captureAndUpload(); // capture immediately, then on interval
  timer = setInterval(captureAndUpload, INTERVAL_MS);
  pushStatus();
}
function stopTracking() {
  tracking = false;
  if (timer) clearInterval(timer);
  timer = null;
  pushStatus();
}

function createWindow() {
  win = new BrowserWindow({
    width: 420,
    height: 580,
    resizable: false,
    title: "MnT Monitor",
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: { preload: path.join(__dirname, "preload.js") },
  });
  win.loadFile("index.html");
  win.on("close", (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      win.hide(); // keep running in the tray
    }
  });
  win.webContents.on("did-finish-load", pushStatus);
}

function updateTray() {
  if (!tray) return;
  tray.setToolTip(`MnT Monitor — ${tracking ? "tracking on" : "paused"}`);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: config.name ? `Signed in: ${config.name}` : "Not signed in", enabled: false },
      { type: "separator" },
      { label: tracking ? "Pause tracking" : "Resume tracking", click: () => (tracking ? stopTracking() : startTracking()) },
      { label: "Show window", click: () => win && win.show() },
      { type: "separator" },
      { label: "Quit", click: () => { app.isQuitting = true; app.quit(); } },
    ])
  );
}

ipcMain.handle("login", async (_e, { serverUrl, email, password }) => {
  try {
    const base = (serverUrl || DEFAULT_SERVER).replace(/\/+$/, "");
    const res = await fetch(`${base}/api/agent/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok && d.token) {
      config = { serverUrl: base, token: d.token, name: d.name, code: d.code };
      saveConfig();
      startTracking();
      return { ok: true };
    }
    return { ok: false, error: d.error || "Login failed." };
  } catch {
    return { ok: false, error: "Couldn't reach the server. Check the URL and your connection." };
  }
});
ipcMain.handle("toggle-tracking", () => {
  tracking ? stopTracking() : startTracking();
  return tracking;
});
ipcMain.handle("logout", () => {
  stopTracking();
  config.token = null;
  config.name = null;
  config.code = null;
  saveConfig();
  pushStatus();
});
ipcMain.handle("get-status", () => statusPayload());

app.whenReady().then(() => {
  loadConfig();
  createWindow();
  try {
    tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "assets", "tray.png")));
    updateTray();
  } catch {
    /* tray optional */
  }
  if (config.token) startTracking();
});

app.on("window-all-closed", () => {
  /* keep running in the tray; quit explicitly from the tray menu */
});
