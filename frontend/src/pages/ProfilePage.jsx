import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const { user, setUser, fetchUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || "", company: user?.company || "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [passMsg, setPassMsg] = useState("");
  const [passErr, setPassErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setProfile({ name: user?.name || "", company: user?.company || "" });
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setMessage(""); setError("");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!editMode) return;
    if (profile.name.trim() === "") {
      setError("Name cannot be empty.");
      return;
    }
    try {
      const res = await axios.put("http://localhost:3000/auth/me", profile, { withCredentials: true });
      setUser(res.data.user);
      setMessage("Profile updated!");
      toast.success("Profile updated!");
      setEditMode(false);
      fetchUser();
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassErr(""); setPassMsg("");
    if (!passwords.oldPassword || !passwords.newPassword) {
      setPassErr("Both fields are required");
      return;
    }
    if (passwords.newPassword.length < 6) {
      setPassErr("New password must be at least 6 characters.");
      return;
    }
    try {
      await axios.put("http://localhost:3000/auth/me/password", passwords, { withCredentials: true });
      setPassMsg("Password updated!");
      toast.success("Password updated!");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setPassErr(err.response?.data?.error || "Failed to update password");
      toast.error(err.response?.data?.error || "Failed to update password");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      navigate("/signin");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded p-8 mt-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleProfileUpdate} className="mb-8">
        <div className="mb-4">
          <label className="block font-medium mb-1">Username</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            disabled={!editMode}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            value={user.email}
            className="w-full border px-3 py-2 rounded bg-gray-100"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Company</label>
          <input
            name="company"
            value={profile.company}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            disabled={!editMode}
          />
        </div>
        {message && <div className="text-green-600 mb-2">{message}</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex gap-2 mt-2">
          {!editMode ? (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setEditMode(true)}
            >Edit Profile</button>
          ) : (
            <>
              <button onClick={handleProfileUpdate} type="button" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => {
                  setEditMode(false);
                  setProfile({ name: user.name, company: user.company || "" });
                  setMessage(""); setError("");
                }}
              >Cancel</button>
            </>
          )}
        </div>
      </form>
      <form onSubmit={handlePasswordChange}>
        <h2 className="font-bold mb-3 mt-2">Update Password</h2>
        <div className="mb-3">
          <input
            type="password"
            name="oldPassword"
            value={passwords.oldPassword}
            placeholder="Current Password"
            onChange={e => setPasswords({ ...passwords, oldPassword: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            autoComplete="current-password"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            placeholder="New Password"
            onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            autoComplete="new-password"
          />
        </div>
        {passMsg && <div className="text-green-600 mb-2">{passMsg}</div>}
        {passErr && <div className="text-red-500 mb-2">{passErr}</div>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Change Password
        </button>
      </form>
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;