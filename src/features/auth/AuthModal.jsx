import { useState } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import { login, signup } from "../auth/AuthSlice";

// ============ AUTH MODAL COMPONENT ============
function AuthModal({ isOpen, onClose, mode, onSwitchMode }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (mode === "signup" && !formData.name) {
      setError("Please enter your name");
      return;
    }

    if (mode === "login") {
      dispatch(
        login({ email: formData.email, name: formData.email.split("@")[0] })
      );
    } else {
      dispatch(signup({ email: formData.email, name: formData.name }));
    }

    onClose();
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-medium transition"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            onClick={onSwitchMode}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
