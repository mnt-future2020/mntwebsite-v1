// Generate a bcrypt hash for the admin password.
// Usage:  npm run hash -- "your-strong-password"
//   then put the printed hash in .env as ADMIN_PASSWORD_HASH
import bcrypt from "bcryptjs";

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: npm run hash -- "your-password"');
  process.exit(1);
}
console.log(bcrypt.hashSync(pw, 10));
