"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth, useTheme } from "@/app/contexts/AppContext";

interface SidebarProps {
  currentPage?: string;
}

export default function Sidebar({ currentPage = "dashboard" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDark, toggleTheme, language, setLanguage } = useTheme();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: "dashboard",
      href: "/dashboard",
      icon: "ri-dashboard-line",
      label: language === "en" ? "Dashboard" : "डैशबोर्ड",
    },
    {
      id: "notes",
      href: "/notes",
      icon: "ri-sticky-note-line",
      label: language === "en" ? "Notes" : "नोट्स",
    },
    {
      id: "subjects",
      href: "/subjects",
      icon: "ri-book-line",
      label: language === "en" ? "Subjects" : "विषय",
    },
    {
      id: "tests",
      href: "/tests",
      icon: "ri-file-list-3-line",
      label: language === "en" ? "Practice Tests" : "अभ्यास परीक्षा",
    },
    {
      id: "workspace",
      href: "/workspace",
      icon: "ri-layout-grid-line",
      label: language === "en" ? "Workspace" : "कार्यक्षेत्र",
    },
    {
      id: "current-affairs",
      href: "/current-affairs",
      icon: "ri-newspaper-line",
      label: language === "en" ? "Current Affairs" : "समसामयिकी",
    },
    {
      id: "study-planner",
      href: "/study-planner",
      icon: "ri-calendar-check-line",
      label: language === "en" ? "Study Planner" : "अध्ययन योजनाकार",
    },
  ];

  return (
    <div
      className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 sidebar-transition ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-screen sticky top-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 font-pacifico">
              ThinkIAS
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <i
              className={`ri-${
                isCollapsed ? "menu-unfold" : "menu-fold"
              }-line text-gray-600 dark:text-gray-400`}
            ></i>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>
                <div
                  className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    currentPage === item.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className={`${item.icon} text-lg`}></i>
                  </div>
                  {!isCollapsed && (
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {/* Theme & Language Toggle */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i
                className={`ri-${
                  isDark ? "sun" : "moon"
                }-line text-gray-600 dark:text-gray-400`}
              ></i>
            </div>
          </button>

          {!isCollapsed && (
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap"
            >
              {language === "en" ? "हिं" : "EN"}
            </button>
          )}
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {user.displayName?.[0] || user.email?.[0] || "U"}
              </span>
            </div>
            {!isCollapsed && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.displayName || user.email}
                </p>
                <button
                  onClick={logout}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  {language === "en" ? "Logout" : "लॉग आउट"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
