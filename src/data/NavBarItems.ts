interface NavBarItem {
  /**
   * Text that represents the nav item.
   */
  title: string | (() => string);
  /**
   * URL of the nav item.
   *
   * Should start `http(s)`, or be a path relative to the root of the site.
   */
  url: string | (() => string);
  /**
   * Whether the nav item URL is external.
   */
  externalLink: boolean | (() => boolean);
  /**
   * A function that accepts the current page URL and returns whether the link should be highlighted.
   */
  shouldHighlight: (url: string) => boolean;
}

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
  items: NavBarItem[] | (() => NavBarItem[]);
  /**
   * URL of the nav group. Optional.
   *
   * Should start `http(s)`, or be a path relative to the root of the site.
   */
  url?: string | (() => string);
  /**
   * A function that accepts the current page URL and returns whether the group should be highlighted.
   */
  shouldHighlight?: (url: string) => boolean;
}

type NavBarData = ReadonlyArray<NavBarItem | NavBarGroup>;

/**
 * Represents all nav bar items available.
 *
 * The side nav can contain Groups and Items themselves. Groups
 * can contain multiple items.
 */
export const NavBarItems: NavBarData = [] as const;
