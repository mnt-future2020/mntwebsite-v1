// electron-builder afterPack hook: ad-hoc sign the macOS app.
// Apple Silicon refuses to run a completely unsigned app ("…is damaged and can't
// be opened"). Ad-hoc signing (codesign -s -) gives it a valid signature so it
// runs after the user does "right-click → Open" once. (Proper distribution
// without that step still needs an Apple Developer ID + notarization.)
const { execSync } = require("child_process");
const path = require("path");

exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== "darwin") return;
  const appName = context.packager.appInfo.productFilename;
  const appPath = path.join(context.appOutDir, `${appName}.app`);
  console.log("  • ad-hoc signing", appPath);
  execSync(`codesign --force --deep --sign - "${appPath}"`, { stdio: "inherit" });
};
