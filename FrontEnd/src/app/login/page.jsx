
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiLock, FiMail, FiShield } from "react-icons/fi";
import { userLoginAPI } from "@/services/user.service";
import { useDispatch } from "react-redux";
import { login, setAdminId } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await userLoginAPI(email, password);

      dispatch(login(res.data.token));
      dispatch(setAdminId(res.data.adminId));

      toast.success(res.data.message);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080F1C] text-white flex items-center justify-center px-5 py-12">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#C6A66B]/[0.07] blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "65px 65px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[1050px] grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-[#101B2C] shadow-2xl"
      >

        {/* Left branding section */}
        <div className="relative hidden md:flex flex-col justify-between min-h-[650px] p-12 overflow-hidden border-r border-white/10">

          <div className="absolute inset-0 bg-gradient-to-br from-[#172B43] via-[#101D30] to-[#0A1423]" />

          <div className="absolute -right-24 top-32 w-80 h-80 rounded-full border border-[#C6A66B]/20" />
          <div className="absolute -right-12 top-44 w-56 h-56 rounded-full border border-[#C6A66B]/15" />

          <div className="relative z-10">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif tracking-[0.22em] text-white">
                DAWN <span className="text-[#C6A66B]">ESTATE</span>
              </span>
              <span className="block mt-2 text-[9px] tracking-[0.42em] text-gray-400 uppercase">
                Exceptional Properties
              </span>
            </Link>
          </div>

          <div className="relative z-10 max-w-sm">
            <div className="w-12 h-px bg-[#C6A66B] mb-8" />

            <p className="text-[#C6A66B] text-xs tracking-[0.3em] uppercase mb-5">
              Marrakech Real Estate
            </p>

            <h1 className="text-4xl lg:text-5xl font-serif leading-[1.2] text-white">
              Where
              <span className="block italic text-[#C6A66B]">
                Exceptional
              </span>
              Living Begins.
            </h1>

            <p className="mt-7 text-sm leading-7 text-gray-400 max-w-xs">
              Your private gateway to managing exclusive properties and
              exceptional real estate opportunities in Marrakech.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.15em] text-gray-500 uppercase">
            <span>Luxury Real Estate</span>
            <span>Marrakech · Morocco</span>
          </div>
        </div>

        {/* Right login section */}
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 md:px-14">

          {/* Mobile logo */}
          <div className="md:hidden text-center mb-12">
            <Link href="/" className="text-xl font-serif tracking-[0.2em]">
              DAWN <span className="text-[#C6A66B]">ESTATE</span>
            </Link>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-[#C6A66B]" />
              <span className="text-[#C6A66B] text-[10px] tracking-[0.3em] uppercase">
                Private Access
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              Welcome Back
            </h2>

            <p className="mt-3 text-sm text-gray-400 leading-6">
              Sign in to access your account and manage your properties.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium tracking-wide text-gray-300 mb-3"
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                  autoComplete="email"
                  className="w-full h-14 rounded-lg border border-white/10 bg-[#0B1524] pl-12 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:border-[#C6A66B]/60 focus:ring-1 focus:ring-[#C6A66B]/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium tracking-wide text-gray-300 mb-3"
              >
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  autoComplete="current-password"
                  className="w-full h-14 rounded-lg border border-white/10 bg-[#0B1524] pl-12 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:border-[#C6A66B]/60 focus:ring-1 focus:ring-[#C6A66B]/20"
                />
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                href="/sendmail"
                className="text-xs text-[#C6A66B] hover:text-[#E0C38D] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { y: -2 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="group w-full h-14 flex items-center justify-center gap-3 rounded-lg bg-[#C6A66B] text-[#101827] text-sm font-semibold tracking-wide transition-all hover:bg-[#D8BB83] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}

              {!loading && (
                <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
              )}
            </motion.button>
          </form>

          {/* Security note */}
          <div className="mt-10 pt-7 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <FiShield className="text-[#C6A66B]" />
              <span className="text-[10px] tracking-wide">
                Secure access to your private account
              </span>
            </div>
          </div>

        </div>
      </motion.div>

      <div className="absolute bottom-5 left-0 right-0 text-center text-[10px] tracking-wider text-gray-600">
        © {new Date().getFullYear()} DAWN ESTATE. ALL RIGHTS RESERVED.
      </div>
    </main>
  );
}
