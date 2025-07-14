import React, { useState, useEffect } from 'react';
import { Moon, Sun, ChevronDown, Zap, Shield, BarChart3, Menu, X } from 'lucide-react';
import logo from './assets/project-logo-removebg-preview (1).png';
import darklogo from './assets/darklogo.png';
import { SlideIn } from "./SlideIn";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'data-insights', 'simulation', 'monitoring', 'console'];
      const scrollPosition = window.scrollY + 100;
      
      setIsScrolled(window.scrollY > 50);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileNavOpen(false); // Close mobile nav on selection
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-all duration-500 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Animated Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md py-3 px-3 md:py-4 md:px-6 transform transition-all duration-500 ${
        isScrolled 
          ? (isDarkMode ? 'bg-gray-900/95 shadow-2xl border-b border-gray-700' : 'bg-black/95 shadow-2xl border-b border-gray-800')
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white">
          <div className="flex items-center space-x-2 md:space-x-4 animate-slide-in-left">
            <img 
              src={
                isScrolled
                ? (isDarkMode ? darklogo  : darklogo )
                : (isDarkMode ? darklogo  : logo)
              }
              alt="ChemSafe AI Logo" 
              className="h-10 w-auto md:h-12 transform transition-transform duration-300 hover:scale-110 hover:rotate-3"
            />
            <div>
              <h1 className="text-lg md:text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-400 hover:to-pink-400 transition-all duration-300">
                <a href='/'><span>CHEMSAFE AI+</span></a>
              </h1>
              <p className="hidden sm:block text-xs md:text-sm animate-fade-in transition-colors duration-300 text-gray-300">
                INNOVATING SAFETY AND EFFICIENCY IN CHEMICAL INDUSTRIES
              </p>
            </div>
          </div>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex space-x-4 lg:space-x-8 animate-slide-in-right">
              {[
                { id: 'home', label: 'HOME' },
                { id: 'data-insights', label: 'DATA INSIGHTS' },
                { id: 'simulation', label: 'SIMULATION' },
                { id: 'monitoring', label: 'MONITORING' },
                { id: 'console', label: 'CONSOLE' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-bold transition-all duration-300 transform hover:scale-105 hover:text-blue-400 relative group ${
                    activeSection === item.id ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform transition-transform duration-300 ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
            </nav>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg ${
                isDarkMode 
                  ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-yellow-500/50' 
                  : 'bg-gray-700 text-yellow-400 hover:bg-gray-600 shadow-gray-700/50'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg ${
                isDarkMode 
                  ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-yellow-500/50' 
                  : 'bg-gray-700 text-yellow-400 hover:bg-gray-600 shadow-gray-700/50'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Nav Drawer */}
        {mobileNavOpen && (
          <div
            className={`fixed inset-0 z-50 flex flex-col bg-black/80 lg:hidden`}
            onClick={() => setMobileNavOpen(false)}
          >
            <div
              className={`flex-1 flex flex-col justify-center items-center w-full ${isDarkMode ? 'bg-black' : 'bg-white'} rounded-t-3xl shadow-2xl relative pt-8 pb-6 px-4`}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
              >×</button>
              <nav className="w-full flex flex-col items-center space-y-8 mt-12 mb-8">
                {[
                  { id: 'home', label: 'HOME' },
                  { id: 'data-insights', label: 'DATA INSIGHTS' },
                  { id: 'simulation', label: 'SIMULATION' },
                  { id: 'monitoring', label: 'MONITORING' },
                  { id: 'console', label: 'CONSOLE' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-4/5 text-2xl font-bold py-4 rounded-xl text-center transition-all duration-200 shadow-sm ${
                      activeSection === item.id
                        ? (isDarkMode ? 'text-blue-400 bg-gray-900' : 'text-blue-600 bg-blue-50')
                        : (isDarkMode ? 'text-white hover:text-blue-400 hover:bg-gray-900' : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50')
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <div
                className={`w-full text-center text-xs font-semibold py-4 border-t ${isDarkMode ? 'border-gray-800 text-gray-400 bg-black' : 'border-gray-200 text-gray-500 bg-white'}`}
              >
                © 2025 ChemSafe AI. All rights reserved.
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Animated Hero Section */}
      <section id="home" className={`pt-20 md:py-32 py-24 overflow-hidden relative transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800'
      }`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-8 animate-fade-in-up bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            REVOLUTIONIZING
          </h2>
          <h3 className="text-2xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-8 animate-fade-in-up animation-delay-200 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            CHEMICAL SAFETY
          </h3>
          <p className="text-base sm:text-xl font-bold mb-8 md:mb-12 animate-fade-in-up animation-delay-400 text-blue-100">
            Advanced AI-Powered Monitoring & Analysis for Chemical Industries
          </p>
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16 animate-fade-in-up animation-delay-500">
            {[
              { icon: Shield, title: 'ENHANCED SAFETY', desc: 'Real-time monitoring with automated emergency protocols', color: 'from-blue-500 to-cyan-500' },
              { icon: Zap, title: 'PROCESS OPTIMIZATION', desc: 'AI-driven efficiency improvements and predictive maintenance', color: 'from-purple-500 to-pink-500' },
              { icon: BarChart3, title: 'DATA ANALYTICS', desc: 'Comprehensive insights and visualization tools', color: 'from-green-500 to-emerald-500' }
            ].map((feature, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 transform transition-all duration-300 hover:scale-105 hover:bg-white/20 border border-white/20 animate-fade-in-up`} style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center transform transition-transform duration-300 hover:rotate-12`}>
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{feature.title}</h4>
                <p className="text-blue-100 text-xs md:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
          <a href="https://www.chemsafe.xyz/">
            <button className={`px-8 py-4 md:px-16 md:py-6 text-base md:text-xl font-black transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-900 rounded-full relative overflow-hidden group ${
              isDarkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-500' 
                : 'bg-white text-black hover:bg-blue-50'
            }`}>
              <span className="relative z-10">GET STARTED NOW</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </a>
          {/* Scroll Indicator */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white/70" />
          </div>
        </div>
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-float ${
                isDarkMode ? 'bg-blue-400/30' : 'bg-white/30'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Data Insights Section with Image */}
      <section id="data-insights" className={`py-16 md:py-20 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <SlideIn direction="left">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="flex items-center mb-6">
                <div className="w-2 h-16 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-6"></div>
                <span className={`text-sm font-bold tracking-wider uppercase ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>01. DATA INSIGHTS</span>
              </div>
              <h3 className="text-5xl font-black mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DATA INSIGHTS & VISUALIZATION
              </h3>
              <p className={`text-xl mb-8 font-semibold leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Real-time dashboards provide actionable insights, trend analysis, and intuitive reports to
                support smarter decision making.
              </p>
              <div className="space-y-6">
                {[
                  { color: 'bg-blue-600', text: 'Custom Axes & Chart Options' },
                  { color: 'bg-purple-600', text: 'Time-Series & Anomaly Analysis' },
                  { color: 'bg-green-600', text: 'Interactive Data Exploration' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className={`w-6 h-6 ${item.color} rounded-full animate-pulse shadow-lg`}></div>
                    <span className={`font-bold text-lg transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className={`p-6 shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:rotate-1 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <img 
                  src={isDarkMode 
                    ? "/assets/darkinsight.png" 
                    : "/assets/insight.png"
                  }
                  alt="Data Insights Dashboard showing parallel coordinates analysis"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </div>
              
              {/* Floating Stats */}
              <div className={`mt-8 grid grid-cols-3 gap-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {[
                  { label: 'Parameters', value: '15+' },
                  { label: 'Accuracy', value: '99.8%' },
                  { label: 'Real-time', value: '24/7' }
                ].map((stat, index) => (
                  <div key={index} className={`text-center p-4 rounded-xl transform transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                  }`}>
                    <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-sm font-semibold opacity-70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </SlideIn>
      </section>

      {/* Simulation Section with Image */}
      <section id="simulation" className={`py-16 md:py-20 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-black' 
          : 'bg-gradient-to-br from-white to-purple-50'
      }`}>
        <SlideIn direction="right">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left order-2 lg:order-1">
              <div className={`p-6 shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:-rotate-1 relative group ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <img 
                  src={isDarkMode 
                    ? "/assets/darkefficiency.png" 
                    : "/assets/efficiency.png"
                  }
                  alt="Simulation & Predictive Analysis interface showing Haber-Bosch process"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
            <div className="animate-slide-in-right order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-2 h-16 bg-gradient-to-b from-green-600 to-blue-600 rounded-full mr-6"></div>
                <span className={`text-sm font-bold tracking-wider uppercase ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>02. SIMULATION</span>
              </div>
              <h3 className="text-5xl font-black mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                SIMULATION & PREDICTIVE ANALYSIS
              </h3>
              <p className={`text-xl mb-8 font-semibold leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Predicts KPIs like yield and emissions; optimization algorithms adjust parameters in real-time
                to maximize efficiency. 
              </p>
              <div className="space-y-6">
                {[
                  { title: 'PROCESS OPTIMIZATION', desc: 'AI-driven efficiency improvements and catalyst activity monitoring', icon: '⚡' },
                  { title: 'EQUIPMENT EFFICIENCY', desc: 'Real-time performance tracking and predictive maintenance', icon: '🔧' }
                ].map((item, index) => (
                  <div key={index} className={`p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up relative overflow-hidden group ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' 
                      : 'bg-gradient-to-r from-gray-100 to-blue-100'
                  }`} style={{ animationDelay: `${index * 0.3}s` }}>
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <h4 className={`font-black text-lg transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>{item.title}</h4>
                    </div>
                    <p className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>{item.desc}</p>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </SlideIn>
      </section>

      {/* Process Monitoring Section with Image */}
      <section id="monitoring" className={`py-16 md:py-20 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-red-900/50 to-gray-900' 
          : 'bg-gradient-to-br from-red-50 to-orange-50'
      }`}>
        <SlideIn direction="up">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="flex items-center mb-6">
                <div className="w-2 h-16 bg-gradient-to-b from-red-600 to-orange-600 rounded-full mr-6"></div>
                <span className={`text-sm font-bold tracking-wider uppercase ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>03. MONITORING</span>
              </div>
              <h3 className="text-5xl font-black mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                REAL-TIME PROCESS MONITORING
              </h3>
              <p className={`text-xl mb-8 font-semibold leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Advanced safety monitoring with automated emergency shutdown protocols 
                and comprehensive parameter tracking for the Industrial process driven by Machine Learning Models.
              </p>
              
              {/* Emergency Alert Box */}
              <div className={`border-l-8 border-red-600 p-6 mb-8 rounded-r-xl animate-pulse-slow transition-all duration-300 relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-red-900/50 to-red-800/50' 
                  : 'bg-gradient-to-r from-red-100 to-red-200'
              }`}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/20 rounded-full -mr-8 -mt-8"></div>
                <h4 className={`font-black text-lg mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-red-400' : 'text-red-800'
                }`}>⚠️ EMERGENCY SHUTDOWN SYSTEM</h4>
                <p className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-red-300' : 'text-red-700'
                }`}>Automated safety protocols detect anomalies and initiate emergency shutdowns</p>
              </div>
              <div className="space-y-4">
                {/* Compressor Temperature Card (Red) */}
                <div
                  className={`p-4 shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 animate-fade-in-up relative group ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                  style={{ animationDelay: `0s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">🔥</span>
                      <span
                        className={`font-bold transition-colors duration-300 text-red-800 group-hover:text-red ${isDarkMode ? 'text-gray-200 group-hover:text-white' : ''}`}
                      >
                        Compressor Temperature:
                      </span>
                    </div>
                    <span
                      className={`font-black text-lg px-3 py-1 rounded-full transition-colors duration-300 text-red-600 bg-red-100 group-hover:text-white group-hover:bg-red-600 ${isDarkMode ? 'text-red-400 bg-red-900/30 group-hover:text-white group-hover:bg-red-600' : ''}`}
                    >
                      CRITICAL
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                </div>
                {/* Feed Temperature Card (Yellow) */}
                <div
                  className={`p-4 shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 animate-fade-in-up relative group ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                  style={{ animationDelay: `0.2s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">⚠️</span>
                      <span
                        className={`font-bold transition-colors duration-300 text-yellow-800 group-hover:text-yellow ${isDarkMode ? 'text-gray-200 group-hover:text-white' : ''}`}
                      >
                        Feed Temperature:
                      </span>
                    </div>
                    <span
                      className={`font-black text-lg px-3 py-1 rounded-full transition-colors duration-300 text-yellow-600 bg-yellow-100 group-hover:text-white group-hover:bg-yellow-500 ${isDarkMode ? 'text-yellow-400 bg-yellow-900/30 group-hover:text-white group-hover:bg-yellow-500' : ''}`}
                    >
                      WARNING
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-yellow-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className={`p-6 shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:rotate-1 relative group ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <img 
                  src={isDarkMode 
                    ? "/assets/darksim.png" 
                    : "/assets/Sim.png"
                  }
                  alt="Process Monitoring Dashboard showing Haber-Bosch process parameters"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
        </SlideIn>
      </section>

      {/* Console Logs Section with Image */}
      <section id="console" className={`py-16 md:py-20 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black to-gray-900' 
          : 'bg-gradient-to-br from-gray-900 to-black'
      } text-white`}>
        <SlideIn direction="down">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left order-2 lg:order-1">
              <div className={`p-6 shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:-rotate-1 border relative group ${
                isDarkMode ? 'bg-black border-gray-600' : 'bg-gray-800 border-gray-700'
              }`}>
                <img 
                  src={isDarkMode 
                    ? "/assets/darkconsole.png" 
                    : "/assets/console.png"
                  }
                  alt="Console Log System showing system activities and optimization results"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
            <div className="animate-slide-in-right order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-2 h-16 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-6"></div>
                <span className="text-sm font-bold tracking-wider uppercase text-cyan-400">04. CONSOLE</span>
              </div>
              <h3 className="text-5xl font-black text-white mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SYSTEM CONSOLE & LOGS
              </h3>
              <p className="text-xl text-gray-300 mb-8 font-semibold leading-relaxed">
                Comprehensive system logging with real-time monitoring of all process activities, 
                user interactions, and optimization results with detailed timestamps.
              </p>
              
              {/* Terminal Window */}
              <div className={`p-6 font-mono text-sm mb-8 rounded-xl border transition-all duration-300 relative ${
                isDarkMode ? 'bg-black border-gray-600' : 'bg-gray-800 border-gray-700'
              }`}>
                {/* Terminal Header */}
                <div className="flex items-center mb-4 pb-2 border-b border-gray-600">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400 text-xs">system.log</span>
                </div>
                <p className="text-green-400 mb-2 animate-typing">System @ 22:47:15 {'>'}{'>'}  Dark mode disabled</p>
                <p className="text-blue-400 mb-2 animate-typing animation-delay-200">System @ 22:48:10 {'>'}{'>'}  User clicked on Section 2</p>
                <p className="text-purple-400 animate-typing animation-delay-400">System @ 13:49:33 {'>'}{'>'}  Dark mode enabled</p>
                <div className="mt-2 flex items-center">
                  <span className="text-gray-400">$ </span>
                  <div className="w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
                </div>
              </div>
              
              {/* Status Indicators */}
              <div className="space-y-4">
                {[
                  { color: 'bg-green-500', text: 'Catalyst Activity: 75.71%', status: 'OPTIMAL' },
                  { color: 'bg-blue-500', text: 'Mixing Efficiency: Partial Mixing', status: 'ACTIVE' },
                  { color: 'bg-purple-500', text: 'Predicted Ammonia: 6748.08', status: 'TRACKING' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg animate-fade-in-up hover:bg-gray-800/70 transition-colors duration-300" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 ${item.color} rounded-full animate-pulse shadow-lg`}></div>
                      <span className="font-bold text-lg">{item.text}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-400 bg-gray-700 px-2 py-1 rounded">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </SlideIn>
      </section>

      {/* Animated Footer */}
      <footer className={`py-12 animate-fade-in transition-all duration-500 ${
        isDarkMode ? 'bg-black text-white' : 'bg-black text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6 animate-bounce-slow">
                <img 
                  src="/assets/darklogo.png" 
                  alt="ChemSafe AI Logo" 
                  className="h-10 w-auto transform transition-transform duration-300 hover:scale-110"
                />
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CHEMSAFE AI+
                </span>
              </div>
              <p className="text-gray-400 text-lg mb-4">Innovating Safety and Efficiency in Chemical Industries</p>
              <p className="text-gray-500 text-sm">Advanced AI-powered monitoring and analysis system for chemical processes with real-time insights and automated safety protocols.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#data-insights" className="hover:text-blue-400 transition-colors duration-300">Data Insights</a></li>
                <li><a href="#simulation" className="hover:text-blue-400 transition-colors duration-300">Simulation</a></li>
                <li><a href="#monitoring" className="hover:text-blue-400 transition-colors duration-300">Monitoring</a></li>
                <li><a href="#console" className="hover:text-blue-400 transition-colors duration-300">Console</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>sameerkumarsingh56@gmail.com</li>
                <li>+91 7007780692</li>
                <li>Lucknow</li>
                <li>Uttar Pradesh, IN 226010</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2025 ChemSafe AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;