"use client";

import React, { useState } from "react";
import { useAuth, useTheme } from "@/app/contexts/AppContext";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const { language } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error("Google auth error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 font-pacifico mb-2">
            ThinkIAS
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === "en"
              ? "Your journey to civil services starts here"
              : "सिविल सेवाओं की आपकी यात्रा यहाँ से शुरू होती है"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === "en" ? "Email" : "ईमेल"}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder={
                language === "en" ? "Enter your email" : "अपना ईमेल दर्ज करें"
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === "en" ? "Password" : "पासवर्ड"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder={
                language === "en"
                  ? "Enter your password"
                  : "अपना पासवर्ड दर्ज करें"
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            {loading ? (
              <i className="ri-loader-4-line animate-spin"></i>
            ) : isLogin ? (
              language === "en" ? (
                "Sign In"
              ) : (
                "साइन इन करें"
              )
            ) : language === "en" ? (
              "Create Account"
            ) : (
              "खाता बनाएं"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
            {language === "en" ? "or" : "या"}
          </span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap"
        >
          <i className="ri-google-fill mr-3 text-red-500"></i>
          {language === "en" ? "Continue with Google" : "गूगल के साथ जारी रखें"}
        </button>

        {/* Toggle Form */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {isLogin
              ? language === "en"
                ? "Don't have an account? Sign up"
                : "कोई खाता नहीं है? साइन अप करें"
              : language === "en"
              ? "Already have an account? Sign in"
              : "पहले से खाता है? साइन इन करें"}
          </button>
        </div>
      </div>
    </div>
  );
}
