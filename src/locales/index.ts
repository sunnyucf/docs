import deepmerge from 'deepmerge';
import Locale from './Locale';

// Locale imports
import LangEn from './en.json';

export type LocaleClass = Locale;
export type LocaleData = typeof BaseLanguage;

const BaseLanguage = LangEn;

function createLocale(locale: typeof BaseLanguage): Locale {
  const mergedLocale = deepmerge(BaseLanguage, locale);

  return new Locale(mergedLocale);
}

// Array of all locales
const localeList = [createLocale(LangEn)];

// -------
// Below is ALL AUTOMATED
// -------

type AvailableLocalesType = (LocaleData['metadata'] & { getLocale(): LocaleClass })[];

export const LocalesByLangCode: Record<string, LocaleClass> = {};
export const AvailableLocales: AvailableLocalesType = [];

// Populate data
localeList.forEach((locale) => {
  LocalesByLangCode[locale.metadata.languageCode] = locale;

  AvailableLocales.push({
    ...locale.metadata,

    getLocale(): LocaleClass {
      return LocalesByLangCode[locale.metadata.languageCode];
    },
  });
});
