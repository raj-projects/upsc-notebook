'use client';

import React, { useState, useEffect } from 'react';
import { generateNotes } from '../../lib/openai';
import { useTheme } from '@/app/contexts/AppContext';

interface Note {
  id?: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  subtopic?: string;
  isAiGenerated: boolean;
}

interface NotesEditorProps {
  note?: Note;
  onBack: () => void;
}

export default function NotesEditor({ note, onBack }: NotesEditorProps) {
  const { language } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: '',
    topic: '',
    subtopic: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('manual');

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        subject: note.subject,
        topic: note.topic,
        subtopic: note.subtopic || ''
      });
    }
  }, [note]);

  const subjects = [
    'History', 'Geography', 'Polity', 'Economics', 'Environment', 
    'Science & Technology', 'Ethics', 'Essay Writing', 'Current Affairs'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateNotes = async () => {
    if (!formData.subject || !formData.topic) {
      alert(language === 'en' ? 'Please select subject and topic first' : 'कृपया पहले विषय और टॉपिक चुनें');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedContent = await generateNotes(formData.subject, formData.topic, language);
      if (generatedContent) {
        setFormData(prev => ({ 
          ...prev, 
          content: generatedContent,
          title: prev.title || `${prev.subject} - ${prev.topic}`
        }));
      }
    } catch (error) {
      console.error('Error generating notes:', error);
      alert(language === 'en' ? 'Failed to generate notes' : 'नोट्स जेनरेट करने में विफल');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.content || !formData.subject) {
      alert(language === 'en' ? 'Please fill all required fields' : 'कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    // Save logic here
    console.log('Saving note:', formData);
    alert(language === 'en' ? 'Note saved successfully!' : 'नोट सफलतापूर्वक सेव हो गया!');
    onBack();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {note ? (language === 'en' ? 'Edit Note' : 'नोट एडिट करें') : (language === 'en' ? 'Create Note' : 'नोट बनाएं')}
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 px-4 py-2 rounded-md text-center cursor-pointer whitespace-nowrap ${
            activeTab === 'manual' 
              ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400 font-medium' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <i className="ri-edit-line mr-2"></i>
          {language === 'en' ? 'Manual Entry' : 'मैन्युअल एंट्री'}
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 px-4 py-2 rounded-md text-center cursor-pointer whitespace-nowrap ${
            activeTab === 'ai' 
              ? 'bg-white dark:bg-gray-600 shadow-sm text-green-600 dark:text-green-400 font-medium' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <i className="ri-robot-line mr-2"></i>
          {language === 'en' ? 'AI Generated' : 'AI जेनरेटेड'}
        </button>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'en' ? 'Subject *' : 'विषय *'}
            </label>
            <div className="relative">
              <select
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none pr-8 cursor-pointer"
              >
                <option value="">{language === 'en' ? 'Select Subject' : 'विषय चुनें'}</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'en' ? 'Topic *' : 'टॉपिक *'}
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              placeholder={language === 'en' ? 'Enter topic name' : 'टॉपिक का नाम दर्ज करें'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Subtopic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'en' ? 'Subtopic' : 'उप-टॉपिक'}
            </label>
            <input
              type="text"
              value={formData.subtopic}
              onChange={(e) => handleInputChange('subtopic', e.target.value)}
              placeholder={language === 'en' ? 'Enter subtopic (optional)' : 'उप-टॉपिक दर्ज करें (वैकल्पिक)'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'en' ? 'Title *' : 'शीर्षक *'}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={language === 'en' ? 'Enter note title' : 'नोट का शीर्षक दर्ज करें'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* AI Generation Section */}
        {activeTab === 'ai' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800 dark:text-green-400 mb-2">
                  <i className="ri-robot-line mr-2"></i>
                  {language === 'en' ? 'AI Note Generation' : 'AI नोट जेनरेशन'}
                </h3>
                <p className="text-sm text-green-600 dark:text-green-300">
                  {language === 'en' 
                    ? 'Generate comprehensive notes based on your selected subject and topic'
                    : 'अपने चुने गए विषय और टॉपिक के आधार पर व्यापक नोट्स जेनरेट करें'
                  }
                </p>
              </div>
              <button
                onClick={handleGenerateNotes}
                disabled={isGenerating || !formData.subject || !formData.topic}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    {language === 'en' ? 'Generating...' : 'जेनरेट हो रहा है...'}
                  </>
                ) : (
                  <>
                    <i className="ri-magic-line mr-2"></i>
                    {language === 'en' ? 'Generate Notes' : 'नोट्स जेनरेट करें'}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Content Editor */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'en' ? 'Content *' : 'सामग्री *'}
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder={language === 'en' ? 'Write your notes here...' : 'यहाँ अपने नोट्स लिखें...'}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-y"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            {language === 'en' ? 'Back to Notes' : 'नोट्स पर वापस जाएं'}
          </button>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer whitespace-nowrap">
              {language === 'en' ? 'Save Draft' : 'ड्राफ्ट सेव करें'}
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer whitespace-nowrap"
            >
              {language === 'en' ? 'Save Note' : 'नोट सेव करें'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}