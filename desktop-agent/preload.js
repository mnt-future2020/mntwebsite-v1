const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("agent", {
  login: (data) => ipcRenderer.invoke("login", data),
  toggleTracking: () => ipcRenderer.invoke("toggle-tracking"),
  logout: () => ipcRenderer.invoke("logout"),
  getStatus: () => ipcRenderer.invoke("get-status"),
  onStatus: (cb) => ipcRenderer.on("status", (_e, s) => cb(s)),
});
