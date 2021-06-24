import { useRecoilValue } from 'recoil';
import { LocaleClass, LocalesByLangCode } from '@locales';
import { LocaleAtom } from '@atoms';

export default function useLocale(): LocaleClass {
  const localeCode = useRecoilValue(LocaleAtom);

  return LocalesByLangCode[localeCode];
}
