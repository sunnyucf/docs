import { useRecoilValue } from 'recoil';
import { AvailableLocales, LocaleClass } from '@locales';
import { LocaleAtom } from '@atoms';

export default function useLocale(): LocaleClass {
  const localeCode = useRecoilValue(LocaleAtom);

  return AvailableLocales[localeCode].getLocale() as LocaleClass;
}
