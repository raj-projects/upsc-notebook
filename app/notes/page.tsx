'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function NotesPage() {
  const [language, setLanguage] = useState('en');
  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [notes] = useState([
    {
      id: '1',
      title: 'Indian Constitution - Fundamental Rights',
      content: 'Detailed notes on fundamental rights...',
      subject: 'Polity',
      topic: 'Constitution',
      subtopic: 'Fundamental Rights',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
      isAiGenerated: false
    },
    {
      id: '2',
      title: 'Geography - Climate Patterns',
      content: 'AI-generated notes on Indian climate...',
      subject: 'Geography',
      topic: 'Climate',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      isAiGenerated: true
    },
    {
      id: '3',
      title: 'Modern History - Freedom Movement',
      content: 'Comprehensive notes on India\'s freedom struggle...',
      subject: 'History',
      topic: 'Modern History',
      subtopic: 'Freedom Movement',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-15'),
      isAiGenerated: false
    }
  ]);

  const menuItems = [
    { id: 'dashboard', href: '/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { id: 'notes', href: '/notes', icon: 'ri-sticky-note-line', label: 'Notes' },
    { id: 'subjects', href: '/subjects', icon: 'ri-book-line', label: 'Subjects' },
    { id: 'tests', href: '/tests', icon: 'ri-file-list-3-line', label: 'Practice Tests' },
    { id: 'workspace', href: '/workspace', icon: 'ri-layout-grid-line', label: 'Workspace' },
    { id: 'current-affairs', href: '/current-affairs', icon: 'ri-newspaper-line', label: 'Current Affairs' },
    { id: 'study-planner', href: '/study-planner', icon: 'ri-calendar-check-line', label: 'Study Planner' }
  ];

  const subjects = ['all', 'Polity', 'Geography', 'History', 'Economics', 'Environment', 'Science & Technology'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleCreateNote = () => {
    alert('Create note functionality will be implemented');
  };

  const handleEditNote = (note) => {
    alert(`Edit note: ${note.title}`);
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
                UPSC Dreams
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
                    item.id === 'notes' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
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
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Notes
              </h1>
            </div>
            
            <button
              onClick={handleCreateNote}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Create Note
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Search and Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* Subject Filter */}
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white text-sm cursor-pointer"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{notes.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Notes</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {notes.filter(n => n.isAiGenerated).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Generated</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {new Set(notes.map(n => n.subject)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Subjects</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {filteredNotes.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Filtered</div>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleEditNote(note)}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                    {note.title}
                  </h3>
                  {note.isAiGenerated && (
                    <div className="ml-2 w-5 h-5 flex items-center justify-center bg-green-100 dark:bg-green-900/20 rounded-full">
                      <i className="ri-robot-line text-green-600 dark:text-green-400 text-xs"></i>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                    {note.subject}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    {note.topic}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {note.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Updated: {note.updatedAt.toLocaleDateString()}</span>
                  <div className="flex items-center">
                    <i className="ri-edit-line mr-1"></i>
                    <span>Edit</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}