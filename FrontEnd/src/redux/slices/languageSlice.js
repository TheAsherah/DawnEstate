import { createSlice } from '@reduxjs/toolkit';

const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar'];

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('dawn-estate-language');

    if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }
  }

  return 'en';
};

const languageSlice = createSlice({
  name: 'language',

  initialState: {
    language: getInitialLanguage(),
  },

  reducers: {
    setLanguage: (state, action) => {
      const newLanguage = action.payload;

      if (SUPPORTED_LANGUAGES.includes(newLanguage)) {
        state.language = newLanguage;

        if (typeof window !== 'undefined') {
          localStorage.setItem('dawn-estate-language', newLanguage);
        }
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;