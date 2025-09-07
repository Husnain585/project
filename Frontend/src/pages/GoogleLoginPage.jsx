// GoogleLoginPage.jsx
import { useEffect } from "react";

export default function GoogleLoginPage() {
  useEffect(() => {
    window.location.href = "http://localhost:3000/api/auth/google"; // your backend route
  }, []);

  return <p>Redirecting to Google login...</p>;
}
