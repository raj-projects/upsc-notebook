'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TestsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const menuItems = [
    { id: 'dashboard', href: '/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { id: 'notes', href: '/notes', icon: 'ri-sticky-note-line', label: 'Notes' },
    { id: 'subjects', href: '/subjects', icon: 'ri-book-line', label: 'Subjects' },
    { id: 'tests', href: '/tests', icon: 'ri-file-list-3-line', label: 'Practice Tests' },
    { id: 'workspace', href: '/workspace', icon: 'ri-layout-grid-line', label: 'Workspace' },
    { id: 'current-affairs', href: '/current-affairs', icon: 'ri-newspaper-line', label: 'Current Affairs' },
    { id: 'study-planner', href: '/study-planner', icon: 'ri-calendar-check-line', label: 'Study Planner' }
  ];

  const testTypes = [
    {
      id: 'mcq',
      title: 'Multiple Choice Questions',
      description: 'AI-generated MCQs with instant feedback',
      icon: 'ri-checkbox-multiple-line',
      color: 'bg-blue-500',
      questions: '10-50',
      duration: '30-120 min'
    },
    {
      id: 'subjective',
      title: 'Subjective Questions',
      description: 'Essay-type questions with AI evaluation',
      icon: 'ri-edit-box-line',
      color: 'bg-green-500',
      questions: '5-15',
      duration: '60-180 min'
    },
    {
      id: 'essay',
      title: 'Essay Writing',
      description: 'Practice essays with AI feedback',
      icon: 'ri-file-text-line',
      color: 'bg-purple-500',
      questions: '1-3',
      duration: '90-180 min'
    },
    {
      id: 'mock',
      title: 'Full Mock Tests',
      description: 'Complete UPSC simulation tests',
      icon: 'ri-calendar-check-line',
      color: 'bg-orange-500',
      questions: '100+',
      duration: '2-4 hours'
    }
  ];

  const recentTests = [
    {
      id: '1',
      title: 'General Studies Paper 1 - History',
      type: 'MCQ',
      score: 85,
      totalQuestions: 25,
      completedAt: '2024-01-15',
      duration: '45 min',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Current Affairs Weekly Test',
      type: 'Mixed',
      score: 78,
      totalQuestions: 30,
      completedAt: '2024-01-14',
      duration: '60 min',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Essay Practice - Social Issues',
      type: 'Essay',
      score: 0,
      totalQuestions: 2,
      completedAt: '',
      duration: '120 min',
      status: 'pending'
    }
  ];

  const handleStartTest = (testType: any) => {
    alert(`Starting ${testType.title} test. This will redirect to the test interface.`);
  };

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
                    item.id === 'tests' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
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
      </div>
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Practice Tests
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                AI-powered tests with instant feedback and performance tracking
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Test Types Grid */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Choose Test Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testTypes.map((testType) => (
                <div
                  key={testType.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleStartTest(testType)}
                >
                  <div className={`${testType.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                    <i className={`${testType.icon} text-white text-xl`}></i>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {testType.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {testType.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>{testType.questions} questions</span>
                    <span>{testType.duration}</span>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Stats */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tests Taken</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">78%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">156</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Questions Solved</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12h</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time Spent</div>
              </div>
            </div>
          </div>

          {/* Recent Tests */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Tests
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Test
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentTests.map((test) => (
                      <tr key={test.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {test.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {test.totalQuestions} questions
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full">
                            {test.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {test.status === 'completed' ? (
                            <div className="text-sm text-gray-900 dark:text-white">
                              {test.score}%
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {test.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            test.status === 'completed' 
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                          }`}>
                            {test.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {test.status === 'completed' ? (
                            <button className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                              View Results
                            </button>
                          ) : (
                            <button className="text-green-600 dark:text-green-400 hover:underline cursor-pointer">
                              Continue
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}