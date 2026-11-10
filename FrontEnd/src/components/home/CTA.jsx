"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useSelector } from 'react-redux';
import { translations } from '@/i18n/translations';

export function CTA() {
  const mode = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.lang.language);
  const isDark = mode === 'dark';

  // Translation helper function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-background text-foreground'} selection:bg-warm-brown pb-32`}>
      {/* Refined Header */}
      <div className={`pt-40 pb-20 border-b ${isDark ? 'border-white/10' : 'border-border'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-warm-brown text-[10px] tracking-[0.5em] uppercase font-medium">
              {t('getInTouch')}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif">
              {t('contact')}
            </h1>
            <p className={`text-sm tracking-[0.2em] uppercase font-light max-w-2xl ${isDark ? 'text-white/60' : 'text-muted-foreground'}`}>
              {t('contactIntro')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-16"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-serif">DAWN ESTATE</h2>
              <p className={`leading-relaxed font-light text-sm max-w-md ${isDark ? 'text-white/70' : 'text-muted-foreground'}`}>
                {t('aboutText')}
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex items-start space-x-8 group">
                <div className={`w-10 h-10 border flex items-center justify-center transition-colors group-hover:border-warm-brown ${isDark ? 'border-white/20 bg-white/5' : 'border-border'}`}>
                  <Mail className="w-4 h-4 text-warm-brown" />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>EMAIL</h3>
                  <div className="space-y-1">
                    <p className={`font-light hover:text-warm-brown transition-colors cursor-pointer ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>contact@dawnestate.com</p>
                    <p className={`font-light hover:text-warm-brown transition-colors cursor-pointer ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>concierge@dawnestate.com</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-8 group">
                <div className={`w-10 h-10 border flex items-center justify-center transition-colors group-hover:border-warm-brown ${isDark ? 'border-white/20 bg-white/5' : 'border-border'}`}>
                  <Phone className="w-4 h-4 text-warm-brown" />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>PHONE</h3>
                  <div className="space-y-1">
                    <a href="https://wa.me/212762829992" target="_blank" rel="noreferrer" className={`font-light hover:text-warm-brown transition-colors block ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>+212 762-829992 (WhatsApp)</a>
                    <p className={`font-light ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>+212 524 XX XX XX</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-8 group">
                <div className={`w-10 h-10 border flex items-center justify-center transition-colors group-hover:border-warm-brown ${isDark ? 'border-white/20 bg-white/5' : 'border-border'}`}>
                  <MapPin className="w-4 h-4 text-warm-brown" />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>{t('address')}</h3>
                  <div className="space-y-1">
                    <p className={`font-light ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>Hivernage, Marrakech</p>
                    <p className={`font-light ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>{t('kingdomOfMorocco')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className={`pt-12 border-t space-y-6 ${isDark ? 'border-white/10' : 'border-border'}`}>
              <h3 className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>{t('followUs')}</h3>
              <div className="flex space-x-8">
                {[
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/' },
                  { icon: Twitter, label: 'Twitter', href: 'https://x.com/' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className={`transition-colors duration-500 ${isDark ? 'text-white/70 hover:text-warm-brown' : 'text-muted-foreground hover:text-warm-brown'}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className={`relative aspect-[4/5] overflow-hidden group border ${isDark ? 'border-white/10' : 'border-border'}`}
          >
            <img
              src="https://images.unsplash.com/photo-1763783695583-c0703902d318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBjaXR5JTIwdmlld3xlbnwxfHx8fDE3Njk3Mzc1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dawn Estate Marrakech"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-1000" />

            <div className="absolute bottom-12 left-12">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-[1px] bg-warm-brown" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-white">{t('marrakechHeadOffice')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}