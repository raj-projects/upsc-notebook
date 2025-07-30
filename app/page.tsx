
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState('en');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('jha_user');
      const savedLanguage = localStorage.getItem('jha_language') || 'en';
      
      setIsLoggedIn(!!user);
      setLanguage(savedLanguage);
      setLoading(false);
    };
    
    setTimeout(checkAuth, 800);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('jha_user', JSON.stringify({ 
      id: 'demo_user', 
      name: 'UPSC Aspirant', 
      email: 'demo@jhawebsite.com' 
    }));
    setIsLoggedIn(true);
    router.push('/dashboard');
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('jha_language', newLang);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl animate-spin text-blue-600 mb-4"></i>
          <p className="text-gray-600">Loading Jha Website...</p>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600" style={{fontFamily: '"Pacifico", serif'}}>
                Jha Website
              </h1>
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                UPSC Preparation
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap"
              >
                {language === 'en' ? 'हिं' : 'EN'}
              </button>
              <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer whitespace-nowrap"
              >
                {language === 'en' ? 'Get Started' : 'शुरू करें'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-cover bg-center opacity-10"
             style={{
               backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20study%20room%20with%20books%2C%20laptop%2C%20and%20educational%20materials%2C%20clean%20minimalist%20background%20with%20soft%20lighting%2C%20academic%20atmosphere%2C%20productivity%20focused%20environment%2C%20inspiring%20workspace%20for%20UPSC%20preparation&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
             }}>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {language === 'en' 
                    ? 'Master UPSC with AI-Powered Preparation' 
                    : 'AI-संचालित तैयारी के साथ UPSC में महारत हासिल करें'
                  }
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {language === 'en'
                    ? 'Complete digital platform with AI-generated notes, practice tests, current affairs, and personalized study planning for your civil services journey.'
                    : 'आपकी सिविल सेवा यात्रा के लिए AI-जनरेटेड नोट्स, प्रैक्टिस टेस्ट, करेंट अफेयर्स, और व्यक्तिगत अध्ययन योजना के साथ पूर्ण डिजिटल प्लेटफॉर्म।'
                  }
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: 'ri-robot-line',
                    title: language === 'en' ? 'AI Notes Generation' : 'AI नोट्स जेनरेशन',
                    desc: language === 'en' ? 'Smart content creation' : 'स्मार्ट कंटेंट क्रिएशन'
                  },
                  {
                    icon: 'ri-file-list-3-line',
                    title: language === 'en' ? 'Practice Tests' : 'प्रैक्टिस टेस्ट',
                    desc: language === 'en' ? 'AI-powered assessments' : 'AI-संचालित आकलन'
                  },
                  {
                    icon: 'ri-newspaper-line',
                    title: language === 'en' ? 'Current Affairs' : 'करेंट अफेयर्स',
                    desc: language === 'en' ? 'Daily updated content' : 'दैनिक अपडेटेड सामग्री'
                  },
                  {
                    icon: 'ri-calendar-check-line',
                    title: language === 'en' ? 'Study Planner' : 'स्टडी प्लानर',
                    desc: language === 'en' ? 'Personalized scheduling' : 'व्यक्तिगत शेड्यूलिंग'
                  }
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-3">
                      <i className={`${feature.icon} text-blue-600 text-xl`}></i>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg cursor-pointer whitespace-nowrap flex items-center justify-center"
                >
                  <i className="ri-play-circle-line mr-2 text-xl"></i>
                  {language === 'en' ? 'Start Free Trial' : 'फ्री ट्रायल शुरू करें'}
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg cursor-pointer whitespace-nowrap">
                  {language === 'en' ? 'Watch Demo' : 'डेमो देखें'}
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20Indian%20student%20studying%20with%20books%20and%20laptop%2C%20UPSC%20preparation%20materials%20spread%20on%20desk%2C%20focused%20studying%20environment%2C%20modern%20educational%20setup%2C%20inspiring%20academic%20atmosphere%2C%20clean%20background&width=800&height=600&seq=hero-student&orientation=landscape"
                alt="UPSC Preparation"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-green-600 text-lg"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">98% Success Rate</p>
                    <p className="text-sm text-gray-600">Among our active users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Everything You Need for UPSC Success' : 'UPSC सफलता के लिए आवश्यक सब कुछ'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Comprehensive tools and resources designed specifically for UPSC aspirants'
                : 'UPSC अभ्यर्थियों के लिए विशेष रूप से डिज़ाइन किए गए व्यापक उपकरण और संसाधन'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-sticky-note-line',
                title: language === 'en' ? 'Smart Notes System' : 'स्मार्ट नोट्स सिस्टम',
                desc: language === 'en' 
                  ? 'Create and organize notes with AI assistance, rich text formatting, and file uploads.'
                  : 'AI सहायता, रिच टेक्स्ट फॉर्मेटिंग, और फ़ाइल अपलोड के साथ नोट्स बनाएं और व्यवस्थित करें।'
              },
              {
                icon: 'ri-book-line',
                title: language === 'en' ? 'Subject Management' : 'विषय प्रबंधन',
                desc: language === 'en'
                  ? 'Manage all UPSC subjects - GS1-4, Essay, Optional subjects with tags and organization.'
                  : 'सभी UPSC विषयों का प्रबंधन - GS1-4, निबंध, वैकल्पिक विषय टैग और संगठन के साथ।'
              },
              {
                icon: 'ri-questionnaire-line',
                title: language === 'en' ? 'AI Practice Tests' : 'AI प्रैक्टिस टेस्ट',
                desc: language === 'en'
                  ? 'Generate unlimited practice questions with AI, get instant feedback and performance analytics.'
                  : 'AI के साथ असीमित अभ्यास प्रश्न जेनरेट करें, तत्काल फीडबैक और प्रदर्शन एनालिटिक्स पाएं।'
              },
              {
                icon: 'ri-layout-grid-line',
                title: language === 'en' ? 'OneNote Workspace' : 'OneNote वर्कस्पेस',
                desc: language === 'en'
                  ? 'Hierarchical organization with drag-drop functionality and MS Word-like formatting.'
                  : 'ड्रैग-ड्रॉप कार्यक्षमता और MS Word जैसी फॉर्मेटिंग के साथ पदानुक्रमित संगठन।'
              },
              {
                icon: 'ri-newspaper-line',
                title: language === 'en' ? 'Current Affairs Hub' : 'करेंट अफेयर्स हब',
                desc: language === 'en'
                  ? 'Daily updated news by subjects and states with AI summaries and note integration.'
                  : 'विषयों और राज्यों के अनुसार दैनिक अपडेटेड समाचार AI सारांश और नोट एकीकरण के साथ।'
              },
              {
                icon: 'ri-calendar-todo-line',
                title: language === 'en' ? 'Study Planner' : 'स्टडी प्लानर',
                desc: language === 'en'
                  ? 'Notion-style planner with calendar view, progress tracking, and streak analytics.'
                  : 'कैलेंडर व्यू, प्रगति ट्रैकिंग, और स्ट्रीक एनालिटिक्स के साथ Notion-स्टाइल प्लानर।'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-xl mb-4">
                  <i className={`${feature.icon} text-blue-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {language === 'en' 
              ? 'Ready to Transform Your UPSC Preparation?' 
              : 'अपनी UPSC तैयारी को बदलने के लिए तैयार हैं?'
            }
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {language === 'en'
              ? 'Join thousands of successful UPSC aspirants who are using our AI-powered platform to achieve their dreams.'
              : 'हजारों सफल UPSC अभ्यर्थियों में शामिल हों जो अपने सपनों को साकार करने के लिए हमारे AI-संचालित प्लेटफॉर्म का उपयोग कर रहे हैं।'
            }
          </p>
          <button
            onClick={handleLogin}
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg cursor-pointer whitespace-nowrap inline-flex items-center"
          >
            <i className="ri-rocket-line mr-2 text-xl"></i>
            {language === 'en' ? 'Start Your Journey Today' : 'आज ही अपनी यात्रा शुरू करें'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2" style={{fontFamily: '"Pacifico", serif'}}>
              Jha Website
            </h3>
            <p className="text-gray-400 mb-4">
              {language === 'en' 
                ? 'Empowering UPSC aspirants with AI-powered preparation tools'
                : 'AI-संचालित तैयारी उपकरणों के साथ UPSC अभ्यर्थियों को सशक्त बनाना'
              }
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
