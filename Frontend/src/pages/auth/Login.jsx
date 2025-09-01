import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const { setUser, setToken } = useContext(GlobalContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.username) errs.username = "Username is required";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login", form);
      if (res.data?.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        navigate("/");
      }
    } catch (err) {
      setErrors({
        api: err.response?.data?.error || "Login failed",
        details: err.message,
      });
      console.log(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {errors.api && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errors.api}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
            {errors.username && (
              <p className="text-red-600 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
