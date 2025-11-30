"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle, Info } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isStaticSite, setIsStaticSite] = useState(false);

  useEffect(() => {
    // Check if we're on a static site (GitHub Pages) by trying to access API
    fetch("/api/auth/[...nextauth]")
      .then((res) => {
        if (res.status === 404) {
          setIsStaticSite(true);
        }
      })
      .catch(() => {
        setIsStaticSite(true);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if API is available
    if (isStaticSite) {
      setError("Admin features require a server. This is a static site (GitHub Pages). Please deploy to Vercel, Netlify, or similar for full functionality.");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-primary/10 via-light-accent/5 to-light-primary/10 dark:from-dark-primary/10 dark:via-dark-accent/5 dark:to-dark-primary/10 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-light-primary/5 dark:bg-dark-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-light-accent/5 dark:bg-dark-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <Logo />
        </div>

        {/* Sign In Card */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-light-primary to-light-primary/80 dark:from-dark-primary dark:to-dark-primary/80 rounded-2xl mb-4 shadow-lg animate-in zoom-in duration-500">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
              Admin Sign In
            </h1>
            <p className="text-light-muted dark:text-dark-muted">
              Sign in to manage your car listings
            </p>
          </div>

          {isStaticSite && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl flex items-start gap-3 text-blue-600 dark:text-blue-400 animate-in slide-in-from-top-2 duration-300">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1">Static Site Detected</p>
                <p className="text-xs">
                  Admin features require a server. For full functionality, deploy to{" "}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                    Vercel
                  </a>
                  {" "}or{" "}
                  <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                    Netlify
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-400 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-light-text dark:text-dark-text"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text transition-all duration-200"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-light-text dark:text-dark-text"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-gradient-to-r from-light-primary to-light-primary/90 dark:from-dark-primary dark:to-dark-primary/90 text-white rounded-xl font-semibold hover:from-light-primary/90 hover:to-light-primary/80 dark:hover:from-dark-primary/90 dark:hover:to-dark-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-light-muted dark:text-dark-muted text-sm mt-6">
          Admin access only
        </p>
      </div>
    </div>
  );
}

