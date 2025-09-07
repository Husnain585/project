// config/oauth/google.js
const { Google } = require("arctic");

const google = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/auth/google/callback"  // backend callback
);

module.exports = google;
