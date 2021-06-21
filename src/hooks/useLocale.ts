import { useRecoilState } from 'recoil';
import type { LocaleData } from '@locales';
import { LocaleAtom } from '@atoms';

export default function useLocale(): Locale {
  const localeCode = useRecoilState(LocaleAtom);
}
