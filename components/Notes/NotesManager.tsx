'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from "@/app/contexts/AppContext";

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  subtopic?: string;
  createdAt: Date;
  updatedAt: Date;
  isAiGenerated: boolean;
}

interface NotesManagerProps {
  onEditNote: (note: Note) => void;
  onCreateNote: () => void;
}

export default function NotesManager({ onEditNote, onCreateNote }: NotesManagerProps) {
  const { language } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock notes data
  useEffect(() => {
    const mockNotes: Note[] = [
      {
        id: '1',
        title: language === 'en' ? 'Indian Constitution - Fundamental Rights' : 'भारतीय संविधान - मौलिक अधिकार',
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
        title: language === 'en' ? 'Geography - Climate Patterns' : 'भूगोल - जलवायु पैटर्न',
        content: 'AI-generated notes on Indian climate...',
        subject: 'Geography',
        topic: 'Climate',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-14'),
        isAiGenerated: true
      },
      {
        id: '3',
        title: language === 'en' ? 'Modern History - Freedom Movement' : 'आधुनिक इतिहास - स्वतंत्रता संग्राम',
        content: 'Comprehensive notes on India\'s freedom struggle...',
        subject: 'History',
        topic: 'Modern History',
        subtopic: 'Freedom Movement',
        createdAt: new Date('2024-01-13'),
        updatedAt: new Date('2024-01-15'),
        isAiGenerated: false
      },
      {
        id: '4',
        title: language === 'en' ? 'Economics - Budget Analysis' : 'अर्थशास्त्र - बजट विश्लेषण',
        content: 'Union Budget 2024 analysis and key points...',
        subject: 'Economics',
        topic: 'Budget',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12'),
        isAiGenerated: true
      }
    ];
    setNotes(mockNotes);
  }, [language]);

  const subjects = ['all', 'Polity', 'Geography', 'History', 'Economics', 'Environment', 'Science & Technology'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="p-6">
      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder={language === 'en' ? 'Search notes...' : 'नोट्स खोजें...'}
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
                {subject === 'all' ? (language === 'en' ? 'All Subjects' : 'सभी विषय') : subject}
              </option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md cursor-pointer ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
          >
            <i className="ri-grid-line text-gray-600 dark:text-gray-300"></i>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md cursor-pointer ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
          >
            <i className="ri-list-check text-gray-600 dark:text-gray-300"></i>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{notes.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Total Notes' : 'कुल नोट्स'}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {notes.filter(n => n.isAiGenerated).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'AI Generated' : 'AI जनरेटेड'}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {new Set(notes.map(n => n.subject)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Subjects' : 'विषय'}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {filteredNotes.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' ? 'Filtered' : 'फिल्टर्ड'}
          </div>
        </div>
      </div>

      {/* Notes Grid/List */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <i className="ri-sticky-note-line text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {language === 'en' ? 'No notes found' : 'कोई नोट्स नहीं मिले'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {language === 'en' ? 'Create your first note to get started' : 'शुरुआत करने के लिए अपना पहला नोट बनाएं'}
          </p>
          <button
            onClick={onCreateNote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap"
          >
            {language === 'en' ? 'Create Note' : 'नोट बनाएं'}
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => onEditNote(note)}
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
                <span>
                  {language === 'en' ? 'Updated' : 'अपडेटेड'}: {note.updatedAt.toLocaleDateString()}
                </span>
                <div className="flex items-center">
                  <i className="ri-edit-line mr-1"></i>
                  <span>{language === 'en' ? 'Edit' : 'एडिट'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}