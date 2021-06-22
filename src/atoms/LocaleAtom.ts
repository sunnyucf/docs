import { AvailableLocales } from '@locales';
import { persistentAtom } from 'recoil-persistence/react';

export const LocaleAtom = persistentAtom(
  {
    key: 'locale',
    default: 'en',
  },
  {
    // If the selected language is unavailable, we'll reset to English
    validator: (data) => {
      return AvailableLocales.some((locale) => locale.languageCode === data);
    },
  }
);
