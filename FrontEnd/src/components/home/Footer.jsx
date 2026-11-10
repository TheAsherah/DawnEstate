"use client";
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';
import { translations } from '@/i18n/translations';
import Link from 'next/link';

export function Footer({ onNavigate }) {
  const mode = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.lang.language);
  const isDark = mode === 'dark';
  const logoSrc = '/uploads/logoooooooooo.png';

  // Translation helper function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <footer className={`border-t transition-colors duration-300 ${isDark ? 'bg-black border-white/10 text-white/70' : 'bg-card border-border text-muted-foreground'} selection:bg-warm-brown`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-32">
          {/* Brand/About */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-16 h-16 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <img src={logoSrc} alt="Dawn Estate logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className={`text-sm font-serif tracking-widest m-0 leading-none ${isDark ? 'text-white' : 'text-foreground'}`}>DAWN ESTATE</h3>
                <p className="text-[8px] uppercase tracking-[0.3em] text-warm-brown mt-1">Marrakech</p>
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest leading-relaxed font-light">
              {t('aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDark ? 'text-white' : 'text-foreground'}`}>{t('quickLinks')}</h4>
            <ul className="space-y-4">
              {[
                { key: '', label: t('home') },
                { key: 'properties', label: t('properties') },
                { key: 'blog', label: t('blog') },
                { key: 'help', label: t('help') }
              ].map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${link.key}`}
                    className="text-[10px] uppercase tracking-widest hover:text-warm-brown transition-colors duration-500 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDark ? 'text-white' : 'text-foreground'}`}>{t('contact')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <Mail className="w-3 h-3 text-warm-brown mt-0.5 group-hover:scale-110 transition-transform" />
                <span className={`text-[10px] uppercase tracking-widest font-light transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}>contact@dawnestate.com</span>
              </li>
              <li className="flex items-start space-x-4 group">
                <Phone className="w-3 h-3 text-warm-brown mt-0.5 group-hover:scale-110 transition-transform" />
                <a href="https://wa.me/212762829992" target="_blank" rel="noreferrer" className={`text-[10px] uppercase tracking-widest font-light transition-colors ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}>+212 762-829992</a>
              </li>
              <li className="flex items-start space-x-4 group">
                <MapPin className="w-3 h-3 text-warm-brown mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest font-light">Hivernage, Marrakech</span>
              </li>
            </ul>
          </div>

          {/* Experience / Socials */}
          <div className="space-y-8">
            <h4 className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDark ? 'text-white' : 'text-foreground'}`}>{t('followUs')}</h4>
            <div className="flex space-x-6">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' }
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className={`transition-colors duration-700 ${isDark ? 'text-white/70 hover:text-warm-brown' : 'text-muted-foreground hover:text-warm-brown'}`}
                >
                  <social.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            <div className={`pt-8 border-t ${isDark ? 'border-white/10' : 'border-border'}`}>
              <p className="text-[8px] uppercase tracking-[0.4em] font-medium text-warm-brown">{t('footerSlogan')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-24 pt-12 border-t ${isDark ? 'border-white/10' : 'border-border'} flex flex-col md:flex-row justify-between items-center gap-8`}>
          <p className="text-[8px] uppercase tracking-[0.5em] font-light">
            © {new Date().getFullYear()} Dawn Estate. {t('allRightsReserved')}.
          </p>
          <div className="flex space-x-12">
            <button className={`text-[8px] uppercase tracking-[0.3em] transition-colors ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}>{t('privacyPolicy')}</button>
            <button className={`text-[8px] uppercase tracking-[0.3em] transition-colors ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}>{t('termsOfService')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}