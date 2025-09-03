// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useGlobalContext } from "../context/GlobalContext";

const Profile = () => {
  const { user, setUser, token, setToken } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({
          username: res.data.username || "",
          email: res.data.email || "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, setUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user/update", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user || res.data);
      setMessage("✅ Profile updated successfully");
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      setMessage("❌ Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/user/change-password", passwords, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Password changed successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
      setChangingPassword(false);
    } catch (err) {
      console.error("❌ Failed to change password:", err);
      setMessage("❌ Failed to change password");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await axiosInstance.delete("/user/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken(null);
      setUser(null);
      setMessage("✅ Account deleted");
    } catch (err) {
      console.error("❌ Failed to delete account:", err);
      setMessage("❌ Failed to delete account");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {message && (
        <p className="mb-4 text-center text-sm text-blue-600">{message}</p>
      )}

      {/* Profile Update Form */}
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md"
      >
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>

      {/* Password Change */}
      <div className="mt-10 max-w-md">
        {!changingPassword ? (
          <button
            onClick={() => setChangingPassword(true)}
            className="text-blue-600 hover:underline"
          >
            Change Password
          </button>
        ) : (
          <form
            onSubmit={handlePasswordChange}
            className="bg-white p-6 rounded-lg shadow space-y-4"
          >
            <div>
              <label className="block font-medium mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, currentPassword: e.target.value })
                }
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save New Password
            </button>
          </form>
        )}
      </div>

      {/* Delete Account */}
      <div className="mt-10">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
