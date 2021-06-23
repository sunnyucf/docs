import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

export interface ILinkProps extends Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> {
  /**
   * Site-relative or external URL.
   */
  url: string;
  children: React.ReactNode;
  /**
   * Opens the link in a new tab.
   */
  openInNewTab?: boolean;
  /**
   * Shows an external link icon.
   */
  externalLinkIcon?: boolean;
}

enum LinkType {
  INTERNAL,
  EXTERNAL,
  ANCHOR,
}

/**
 * Intelligent link component that will automatically switch between
 * Gatsby internal routing links (for links to the docs site), and
 * HTML anchor tags for external links.
 *
 * Ensure that all external links begin with `http(s)://`, and any
 * links to anchor tags begin with `#`.
 */
export function Link({ url, children, openInNewTab = false, externalLinkIcon = false, ...otherProps }: ILinkProps) {
  const linkType: LinkType =
    url.startsWith('http://') || url.startsWith('https://') ? LinkType.EXTERNAL : url.startsWith('#') ? LinkType.ANCHOR : LinkType.INTERNAL;

  switch (linkType) {
    case LinkType.INTERNAL:
      return (
        <GatsbyLink target={openInNewTab ? '_blank' : undefined} to={url} {...otherProps}>
          {children}
        </GatsbyLink>
      );

    case LinkType.EXTERNAL:
    case LinkType.ANCHOR:
      return (
        <a href={url} target={openInNewTab ? '_blank' : undefined} {...otherProps}>
          {children}
        </a>
      );
  }
}
