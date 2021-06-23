import { useSetRecoilState } from 'recoil';
import { LocaleAtom } from '@atoms';

export default function setLocale(localeCode: string) {
  const setLocale = useSetRecoilState(LocaleAtom);
  setLocale(localeCode);
}
