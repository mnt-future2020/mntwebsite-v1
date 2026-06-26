const $ = (id) => document.getElementById(id);

function fmt(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "—";
  }
}

function render(s) {
  const loggedIn = s && s.loggedIn;
  $("login").classList.toggle("hidden", loggedIn);
  $("dash").classList.toggle("hidden", !loggedIn);
  if (!loggedIn) return;
  $("who").textContent = s.name ? `${s.name}${s.code ? " · " + s.code : ""}` : "—";
  $("trk").innerHTML = s.tracking
    ? '<span class="dot on"></span>Tracking on'
    : '<span class="dot off"></span>Paused';
  $("last").textContent = fmt(s.lastCapture);
  $("toggleBtn").textContent = s.tracking ? "Pause tracking" : "Resume tracking";
}

$("loginBtn").addEventListener("click", async () => {
  const btn = $("loginBtn");
  const err = $("loginErr");
  err.classList.add("hidden");
  btn.disabled = true;
  btn.textContent = "Signing in…";
  const res = await window.agent.login({
    serverUrl: $("server").value.trim(),
    email: $("email").value.trim(),
    password: $("password").value,
  });
  btn.disabled = false;
  btn.textContent = "Sign in & start";
  if (res && res.ok) {
    $("password").value = "";
    render(await window.agent.getStatus());
  } else {
    err.textContent = (res && res.error) || "Login failed.";
    err.classList.remove("hidden");
  }
});

$("toggleBtn").addEventListener("click", async () => {
  await window.agent.toggleTracking();
  render(await window.agent.getStatus());
});

$("logoutBtn").addEventListener("click", async () => {
  await window.agent.logout();
  render(await window.agent.getStatus());
});

window.agent.onStatus(render);
window.agent.getStatus().then(render);
