import { AvailableLocales } from '@locales';
import useLocale from '@hooks/useLocale';
import setLocale from '../hooks/setLocale';

interface INavBarItemPartial {
  /**
   * Text that represents the nav item.
   */
  title: string | (() => string);
  /**
   * Whether the nav item URL is external.
   */
  externalLink: boolean | (() => boolean);
  /**
   * A function that accepts the current page URL and returns whether the link should be highlighted.
   */
  shouldHighlight: boolean | ((url: string) => boolean);
}

type NavBarItem = INavBarItemPartial &
  (
    | {
        /**
         * URL of the nav item.
         *
         * Should start `http(s)`, or be a path relative to the root of the site.
         */
        url: string | (() => string);
      }
    | {
        /**
         * Function to run when this item is selected.
         */
        onClick: () => void;
      }
  );

interface NavBarGroup {
  /**
   * Text that represents the nav group.
   */
  title: string | (() => string);
  /**
   * The items within the nav bar group.
   *
   * Can either be an array of items, or a callable
   * method that returns an array of items.
   */
  items: ReadonlyArray<NavBarItem> | (() => ReadonlyArray<NavBarItem>);
  /**
   * URL of the nav group. Optional.
   *
   * Should start `http(s)`, or be a path relative to the root of the site.
   */
  url?: string | (() => string);
  /**
   * A function that accepts the current page URL and returns whether the group should be highlighted.
   */
  shouldHighlight?: boolean | ((url: string) => boolean);
}

type NavBarData = ReadonlyArray<NavBarItem | NavBarGroup>;

/**
 * Represents all nav bar items available.
 *
 * The side nav can contain Groups and Items themselves. Groups
 * can contain multiple items.
 *
 * This function must be called from within a React component
 * to ensure that required data can be fetched from the active
 * React context.
 */
export const NavBarItems = (): NavBarData => {
  const activeLocale = useLocale();

  return [
    {
      title: activeLocale.trans('navBar.items.guide'),
      externalLink: false,
      url: '/',
      shouldHighlight: (slug) => {
        return slug === '/';
      },
    },
    {
      title: activeLocale.trans('navBar.items.extend'),
      externalLink: false,
      url: '/extend',
      shouldHighlight: (slug) => {
        return slug === '/extend' || slug.startsWith('/extend/');
      },
    },
    {
      title: activeLocale.trans('navBar.items.apiReference'),
      externalLink: true,
      url: 'https://api.docs.flarum.org/',
      shouldHighlight: false,
    },
    {
      title: activeLocale.trans('navBar.groups.flarum.groupTitle'),
      shouldHighlight: false,
      items: [
        {
          title: activeLocale.trans('navBar.groups.flarum.items.site'),
          externalLink: true,
          url: 'https://flarum.org/',
          shouldHighlight: false,
        },
        {
          title: activeLocale.trans('navBar.groups.flarum.items.discuss'),
          externalLink: true,
          url: 'https://discuss.flarum.org/',
          shouldHighlight: false,
        },
        {
          title: activeLocale.trans('navBar.groups.flarum.items.github'),
          externalLink: true,
          url: 'https://github.com/flarum',
          shouldHighlight: false,
        },
      ],
    },
    {
      title: activeLocale.trans('navBar.groups.languages.groupTitle'),
      shouldHighlight: false,
      items: AvailableLocales.map(
        (locale): NavBarItem => ({
          title: locale.nativeLanguageName,
          externalLink: false,
          onClick: () => {
            setLocale(locale.languageCode);
          },
          shouldHighlight: locale.languageCode === activeLocale.metadata.languageCode,
        })
      ),
    },
  ] as const;
};
