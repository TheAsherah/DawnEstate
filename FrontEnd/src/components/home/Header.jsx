"use client";
import React, { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { setLanguage } from "@/redux/slices/languageSlice";
import { translations } from "@/i18n/translations";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const mode = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.lang.language);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDark = mode === "dark";

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const logoSrc = "/uploads/logoooooooooo.png";

  const navLinks = [
    { key: "home", label: t("home"), href: "/" },
    { key: "properties", label: t("properties"), href: "/properties" },
    { key: "help", label: t("help"), href: "/help" },
    { key: "contact", label: t("contact"), href: "/contact" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDark
          ? "bg-black/80 border-white/10"
          : "bg-white/90 border-black/10 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            href={"/"}
            onClick={closeMenu}
            className="flex items-center space-x-4 group cursor-pointer"
          >
            <div className="w-16 h-16 sm:w-18 sm:h-18 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <img
                src={logoSrc}
                alt="Dawn Estate logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block text-left pt-2 -ml-1">
              <h1
                className={`text-xl font-serif tracking-widest m-0 leading-none ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                DAWN ESTATE
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-warm-brown mt-0.5">
                {t("exclusiveProperties")}
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-medium transition-all duration-300 relative py-2 ${
                  pathname === link.href
                    ? "text-warm-brown"
                    : isDark
                    ? "text-white/70 hover:text-warm-brown"
                    : "text-slate-600 hover:text-warm-brown"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-warm-brown"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Language Switcher Select */}
            <div className="relative flex items-center">
              <select
                value={language}
                onChange={(e) => dispatch(setLanguage(e.target.value))}
                className={`text-xs uppercase tracking-widest bg-transparent border rounded-md px-2 py-1.5 focus:outline-none transition-colors cursor-pointer ${
                  isDark
                    ? "border-white/20 text-white bg-black/40 hover:border-white/40"
                    : "border-slate-300 text-slate-800 bg-white/50 hover:border-slate-400"
                }`}
              >
                <option value="en" className="bg-slate-900 text-white">
                  EN
                </option>
                <option value="fr" className="bg-slate-900 text-white">
                  FR
                </option>
                <option value="ar" className="bg-slate-900 text-white">
                  AR
                </option>
              </select>
            </div>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleTheme())}
              className={`rounded-full p-2 ${
                isDark
                  ? "text-white/70 hover:text-white hover:bg-white/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Auth Buttons */}
            {/* <div className="hidden sm:flex items-center space-x-4">
              <Link
                href="/login"
                className={`text-[10px] uppercase tracking-widest transition-colors ${
                  isDark
                    ? "text-white/70 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t("login")}
              </Link>

              <Link
                href="/register"
                className="bg-warm-brown hover:bg-warm-brown/90 text-white text-[10px] tracking-widest uppercase px-5 py-2 rounded transition-colors"
              >
                {t("register")}
              </Link>
            </div> */}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className={`lg:hidden p-2 transition-colors ${
                isDark
                  ? "text-white/70 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden border-t ${
            isDark ? "bg-black/95 border-white/10" : "bg-white border-black/10"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={closeMenu}
                className={`text-xs uppercase tracking-widest font-medium py-2 transition-colors ${
                  pathname === link.href
                    ? "text-warm-brown"
                    : isDark
                    ? "text-white/70 hover:text-warm-brown"
                    : "text-slate-600 hover:text-warm-brown"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div
              className={`sm:hidden flex items-center gap-5 pt-4 border-t ${
                isDark ? "border-white/10" : "border-black/10"
              }`}
            >
              <Link
                href="/login"
                onClick={closeMenu}
                className={`text-[10px] uppercase tracking-widest ${
                  isDark ? "text-white/70" : "text-slate-600"
                }`}
              >
                {t("login")}
              </Link>

              <Link
                href="/register"
                onClick={closeMenu}
                className="bg-warm-brown hover:bg-warm-brown/90 text-white text-[10px] tracking-widest uppercase px-5 py-2 rounded transition-colors"
              >
                {t("register")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
