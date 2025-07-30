"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
}

interface AppContextType {
  auth: AuthContextType;
  theme: ThemeContextType;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = () => {
      const savedUser = localStorage.getItem("thinkias_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          localStorage.removeItem("thinkias_user");
        }
      }

      const savedTheme = localStorage.getItem("thinkias_theme");
      if (savedTheme === "dark") {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      const savedLanguage = localStorage.getItem("thinkias_language");
      if (savedLanguage === "hi" || savedLanguage === "en") {
        setLanguage(savedLanguage);
      }

      setLoading(false);
    };

    initializeApp();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const demoUser = {
      id: "demo_user_" + Date.now(),
      displayName: email.split("@")[0],
      email: email,
    };

    setUser(demoUser);
    localStorage.setItem("thinkias_user", JSON.stringify(demoUser));
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const demoUser = {
      id: "demo_user_" + Date.now(),
      displayName: email.split("@")[0],
      email: email,
    };

    setUser(demoUser);
    localStorage.setItem("thinkias_user", JSON.stringify(demoUser));
  };

  const signInWithGoogle = async () => {
    const demoUser = {
      id: "google_user_" + Date.now(),
      displayName: "Google User",
      email: "google.user@gmail.com",
      photoURL: "https://lh3.googleusercontent.com/a/default-user=s96-c",
    };

    setUser(demoUser);
    localStorage.setItem("thinkias_user", JSON.stringify(demoUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("thinkias_user");
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("thinkias_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("thinkias_theme", "light");
    }
  };

  const handleLanguageChange = (lang: "en" | "hi") => {
    setLanguage(lang);
    localStorage.setItem("thinkias_language", lang);
  };

  const authContext: AuthContextType = {
    user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
  };

  const themeContext: ThemeContextType = {
    isDark,
    toggleTheme,
    language,
    setLanguage: handleLanguageChange,
  };

  const contextValue: AppContextType = {
    auth: authContext,
    theme: themeContext,
  };

  if (loading) {
    return React.createElement(
      "div",
      {
        className:
          "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100",
      },
      React.createElement(
        "div",
        { className: "text-center" },
        React.createElement("div", {
          className:
            "w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4",
        }),
        React.createElement(
          "p",
          { className: "text-gray-600" },
          "Loading ThinkIAS..."
        )
      )
    );
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AppProvider");
  }
  return context.auth;
}

export function useTheme(): ThemeContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an AppProvider");
  }
  return context.theme;
}
