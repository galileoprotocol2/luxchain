import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletIcon, ShoppingBag, Menu, X, Search, LogIn, Globe2 } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close language selector when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-language-selector]')) {
        setShowLanguages(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    setShowLanguages(false);
    // Language change logic will be implemented later
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className={`text-2xl font-serif transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              LUXCHAIN
            </Link>
            
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { label: 'Montres', path: '/category/watches' },
                { label: 'Bijoux', path: '/category/jewelry' },
                { label: 'Voitures', path: '/category/cars' },
                { label: 'Art', path: '/category/art' }
              ].map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-full hover:bg-black/5 transition-all ${
                    isScrolled ? 'text-gray-600' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className={`relative group ${isScrolled ? 'text-gray-600' : 'text-white'}`}>
              <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher..."
                className={`pl-10 pr-4 py-2 rounded-full bg-transparent border transition-all w-48 focus:w-64 focus:outline-none ${
                  isScrolled 
                    ? 'border-gray-200 focus:border-gray-400' 
                    : 'border-white/30 focus:border-white'
                }`}
              />
            </div>

            {/* Language Selector */}
            <div className="relative" data-language-selector>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguages(!showLanguages);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  isScrolled 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Globe2 className="h-5 w-5" />
                <span className="text-sm">{selectedLanguage.flag}</span>
              </button>

              {/* Language Dropdown */}
              {showLanguages && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${
                        selectedLanguage.code === language.code ? 'bg-gray-50' : ''
                      }`}
                    >
                      <span className="text-base">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className={`p-2 rounded-full hover:bg-black/5 transition-all ${
              isScrolled ? 'text-gray-600' : 'text-white'
            }`}>
              <ShoppingBag className="h-6 w-6" />
            </button>

            <Link
              to="/login"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                isScrolled 
                  ? 'text-gray-600 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <LogIn className="h-5 w-5" />
              <span className="text-sm font-medium">Connexion</span>
            </Link>

            <Link
              to="/seller/register"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                isScrolled 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <WalletIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Devenir Vendeur</span>
            </Link>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-full hover:bg-black/5 transition-all ${
              isScrolled ? 'text-gray-600' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="pt-20 px-4">
          <nav className="space-y-1">
            {[
              { label: 'Montres', path: '/category/watches' },
              { label: 'Bijoux', path: '/category/jewelry' },
              { label: 'Voitures', path: '/category/cars' },
              { label: 'Art', path: '/category/art' }
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="block px-4 py-3 text-lg text-gray-900 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Language Selector */}
          <div className="mt-6 px-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Langue</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border text-sm ${
                    selectedLanguage.code === language.code
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <Link
              to="/login"
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-900 px-4 py-3 rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="h-5 w-5" />
              <span>Connexion</span>
            </Link>
            
            <Link
              to="/seller/register"
              className="w-full flex items-center justify-center space-x-2 bg-black text-white px-4 py-3 rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <WalletIcon className="h-5 w-5" />
              <span>Devenir Vendeur</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}