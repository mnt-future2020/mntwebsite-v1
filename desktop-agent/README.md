# MnT Monitor — desktop agent

A small Electron app that, while an employee is signed in and tracking is on,
captures the **primary screen every 10 minutes** and uploads it to the MnT
server. The window and tray clearly show that tracking is active — this is
**visible, consent-based monitoring**, not covert surveillance.

## How it fits together

- The agent signs in with the employee's MnT email + password → gets a 30-day
  token from `POST /api/agent/login`.
- Every 10 minutes it captures the screen and `POST`s the JPEG to
  `POST /api/agent/screenshot` (Bearer token).
- The server stores the image in DigitalOcean Spaces and writes a `Screenshot`
  row. Admins/HR view them at **Admin → HR → Screen monitoring**.

## ⚠️ Before you deploy this to employees

1. **Disclose and get written consent.** Employee screen monitoring must be
   disclosed; covert capture is unlawful in many places. Add it to your policy.
2. **Server env vars** (on the website / DigitalOcean App Platform):
   `SPACES_REGION`, `SPACES_BUCKET`, `SPACES_KEY`, `SPACES_SECRET`
   (and run the DB migration so the `Screenshot` table exists).
3. The agent defaults to `https://mntfuture.com`. Change `DEFAULT_SERVER` in
   `main.js` if your domain differs (the sign-in screen also lets you override it).

## Run in development

```bash
cd desktop-agent
npm install
npm start
```

## Build installers

```bash
# Windows (.exe / NSIS) — build on Windows
npm run dist:win

# macOS (.dmg) — build on a Mac
npm run dist:mac
```

Output lands in `desktop-agent/release/`.

### macOS notes

- On first capture, macOS asks the employee to grant **Screen Recording** to
  "MnT Monitor" in **System Settings → Privacy & Security → Screen Recording**.
  After granting, quit and reopen the app once.
- For distribution outside the App Store, sign + **notarize** the app (set your
  Apple Developer ID in electron-builder env vars), otherwise Gatekeeper blocks it.

### Windows notes

- Screen capture needs no special permission. Code-sign the installer to avoid
  SmartScreen warnings (optional but recommended).

## Notes / next steps

- Captures the **primary** display. To capture all monitors, loop over
  `desktopCapturer.getSources({ types: ["screen"] })` and upload each.
- Interval is `INTERVAL_MS` in `main.js` (default 10 min). JPEG quality is
  `JPEG_QUALITY`.
- A future version could tie capturing to the employee's attendance check-in by
  polling a server endpoint before each capture.
