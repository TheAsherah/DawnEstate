"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/redux/slices/themeSlice'; // T2kd mn l-path dyal themeSlice

export function ThemeProvider({ children }) {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  // Mli ytl3 l-component, njibou l-mode mn localStorage wla mn system
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('dawn-theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setTheme(prefersDark ? 'dark' : 'light'));
    }
  }, [dispatch]);

  // Mli ytbdl l-mode f Redux, n-appliquiwh 3la l-HTML
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [mode]);

  return <>{children}</>;
}