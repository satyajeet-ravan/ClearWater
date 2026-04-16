import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaTint } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.phone || !form.address || !form.dob || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: form.fullName,
        email: form.email,
        phone_no: form.phone,
        address: form.address,
        dob: form.dob,
      });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      navigate("/login", { state: { message: "Registration successful! Please log in." } });
    } else {
      navigate("/login", { state: { message: "Please check your email to confirm your account, then log in." } });
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-3">
              <FaTint className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-500 mt-1">Join JalRakshak today</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="fullName" placeholder="Full Name" className={inputClass} value={form.fullName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" className={inputClass} value={form.email} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-3">
              <input type="tel" name="phone" placeholder="Phone Number" className={inputClass} value={form.phone} onChange={handleChange} />
              <input type="date" name="dob" placeholder="Date of Birth" className={inputClass} value={form.dob} onChange={handleChange} />
            </div>

            <input type="text" name="address" placeholder="Full Address" className={inputClass} value={form.address} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-3">
              <input type="password" name="password" placeholder="Password" className={inputClass} value={form.password} onChange={handleChange} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" className={inputClass} value={form.confirmPassword} onChange={handleChange} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-medium py-3 rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 font-medium hover:text-emerald-700 no-underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
