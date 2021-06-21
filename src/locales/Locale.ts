import type { LocaleData } from './index';

export default class Locale {
  private allData: LocaleData;

  public readonly metadata: LocaleData['metadata'];
  private readonly translations: LocaleData['translations'];

  constructor(localeData: LocaleData) {
    this.allData = localeData;

    this.metadata = localeData.metadata;
    this.translations = localeData.translations;
  }

  /**
   * Dot-based access string
   */
  trans(key: string): string {
    try {
      // Resolve value by splitting `key` at dots and traversing the locale data
      const result = key.split('.').reduce((obj, key) => obj[key], this.translations);

      // Only return strings
      if (typeof result !== 'string') return key;

      return result;
    } catch {
      // If we have an error (such as the key not existing), just return the key
      return key;
    }
  }
}
