
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState({ displayName: 'UPSC Aspirant', email: 'demo@jhawebsite.com' });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('jha_user');
      if (!userData) {
        router.push('/');
        return;
      }

      const savedTheme = localStorage.getItem('jha_theme');
      const savedLanguage = localStorage.getItem('jha_language');
      
      if (savedTheme === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
      
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

      setUser(JSON.parse(userData));
    };

    checkAuth();
  }, [router]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('jha_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('jha_theme', 'light');
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('jha_language', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('jha_user');
    router.push('/');
  };

  const menuItems = [
    { 
      id: 'dashboard', 
      href: '/dashboard', 
      icon: 'ri-dashboard-line', 
      label: language === 'en' ? 'Dashboard' : 'डैशबोर्ड' 
    },
    { 
      id: 'notes', 
      href: '/notes', 
      icon: 'ri-sticky-note-line', 
      label: language === 'en' ? 'Notes' : 'नोट्स' 
    },
    { 
      id: 'subjects', 
      href: '/subjects', 
      icon: 'ri-book-line', 
      label: language === 'en' ? 'Subjects' : 'विषय' 
    },
    { 
      id: 'tests', 
      href: '/tests', 
      icon: 'ri-file-list-3-line', 
      label: language === 'en' ? 'Practice Tests' : 'अभ्यास परीक्षा' 
    },
    { 
      id: 'workspace', 
      href: '/workspace', 
      icon: 'ri-layout-grid-line', 
      label: language === 'en' ? 'Workspace' : 'कार्यक्षेत्र' 
    },
    { 
      id: 'current-affairs', 
      href: '/current-affairs', 
      icon: 'ri-newspaper-line', 
      label: language === 'en' ? 'Current Affairs' : 'समसामयिकी' 
    },
    { 
      id: 'study-planner', 
      href: '/study-planner', 
      icon: 'ri-calendar-check-line', 
      label: language === 'en' ? 'Study Planner' : 'अध्ययन योजनाकार' 
    }
  ];

  const stats = [
    {
      title: language === 'en' ? 'Total Notes' : 'कुल नोट्स',
      value: '248',
      icon: 'ri-sticky-note-line',
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: language === 'en' ? 'Subjects Covered' : 'कवर किए गए विषय',
      value: '15',
      icon: 'ri-book-line',
      color: 'bg-green-500',
      change: '+3'
    },
    {
      title: language === 'en' ? 'Tests Completed' : 'पूर्ण किए गए टेस्ट',
      value: '89',
      icon: 'ri-file-list-3-line',
      color: 'bg-purple-500',
      change: '+24%'
    },
    {
      title: language === 'en' ? 'Study Streak' : 'अध्ययन श्रृंखला',
      value: '23 days',
      icon: 'ri-fire-line',
      color: 'bg-orange-500',
      change: 'active'
    },
  ];

  const recentActivities = [
    {
      type: 'note',
      title: language === 'en' ? 'Created note: Indian Constitution' : 'नोट बनाया: भारतीय संविधान',
      time: '2 hours ago',
      icon: 'ri-sticky-note-add-line',
      color: 'text-blue-600'
    },
    {
      type: 'test',
      title: language === 'en' ? 'Completed Geography Mock Test' : 'भूगोल मॉक टेस्ट पूरा किया',
      time: '5 hours ago',
      icon: 'ri-checkbox-circle-line',
      color: 'text-green-600'
    },
    {
      type: 'study',
      title: language === 'en' ? 'Study session: Modern History' : 'अध्ययन सत्र: आधुनिक इतिहास',
      time: '1 day ago',
      icon: 'ri-book-read-line',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col h-screen sticky top-0`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400" style={{fontFamily: '"Pacifico", serif'}}>
                ThinkIAS
              </h1>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <i className={`ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line text-gray-600 dark:text-gray-400`}></i>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>
                  <div className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    item.id === 'dashboard' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`${item.icon} text-lg`}></i>
                    </div>
                    {!isCollapsed && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`ri-${isDark ? 'sun' : 'moon'}-line text-gray-600 dark:text-gray-400`}></i>
              </div>
            </button>
            
            {!isCollapsed && (
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap"
                title="Switch Language"
              >
                {language === 'en' ? 'हिं' : 'EN'}
              </button>
            )}
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {user.displayName?.[0] || 'U'}
              </span>
            </div>
            {!isCollapsed && (
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.displayName}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  {language === 'en' ? 'Logout' : 'लॉगआउट'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'en' ? 'Welcome back' : 'वापसी पर स्वागत है'}, {user.displayName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {language === 'en' ? 'Continue your UPSC preparation journey' : 'अपनी UPSC तैयारी की यात्रा जारी रखें'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400" suppressHydrationWarning={true}>
                {new Date().toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`${stat.color} rounded-lg p-3`}>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className={`${stat.icon} text-white text-xl`}></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Quick Actions' : 'त्वरित क्रियाएं'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: language === 'en' ? 'Create Note' : 'नोट बनाएं', icon: 'ri-add-line', href: '/notes', color: 'bg-blue-500' },
                  { label: language === 'en' ? 'Take Test' : 'टेस्ट लें', icon: 'ri-file-list-3-line', href: '/tests', color: 'bg-green-500' },
                  { label: language === 'en' ? 'Study Planner' : 'अध्ययन योजना', icon: 'ri-calendar-line', href: '/study-planner', color: 'bg-purple-500' },
                  { label: language === 'en' ? 'Current Affairs' : 'समसामयिकी', icon: 'ri-newspaper-line', href: '/current-affairs', color: 'bg-orange-500' },
                  { label: language === 'en' ? 'Workspace' : 'वर्कस्पेस', icon: 'ri-layout-grid-line', href: '/workspace', color: 'bg-indigo-500' },
                  { label: language === 'en' ? 'Subjects' : 'विषय', icon: 'ri-book-line', href: '/subjects', color: 'bg-pink-500' },
                ].map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
                      <div className={`w-12 h-12 flex items-center justify-center ${action.color} rounded-lg mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <i className={`${action.icon} text-white text-xl`}></i>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white text-center">
                        {action.label}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {language === 'en' ? 'Recent Activities' : 'हाल की गतिविधियां'}
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full`}>
                        <i className={`${activity.icon} ${activity.color} text-sm`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                  {language === 'en' ? 'View All Activities' : 'सभी गतिविधियां देखें'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
