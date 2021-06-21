import { persistentAtom } from 'recoil-persistence/react';

export const LocaleAtom = persistentAtom({
  key: 'locale',
  default: 'en',
});
