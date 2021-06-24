import React from 'react';

import { useLocation } from '@reach/router';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import ExternalLinkIcon from '@assets/icons/external-link.svg';

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
   *
   * Will only show if the link is detected to be external and this is `true`.
   */
  externalLinkIcon?: boolean;
  /**
   * Custom link class.
   */
  className?: string;
}

enum LinkType {
  INTERNAL,
  EXTERNAL,
  ANCHOR,
}

const useStyles = makeStyles({
  linkRoot: {
    color: 'var(--orange-text)',
  },
  externalIcon: {
    // display: 'inline-block',
    '&::after': {
      height: '1em',
      width: '1em',
      content: '""',
      display: 'inline-block',
      background: `url(${ExternalLinkIcon})`,
    },
  },
});

/**
 * Intelligent link component that will automatically switch between
 * Gatsby internal routing links (for links to the docs site), and
 * HTML anchor tags for external links.
 *
 * Ensure that all external links begin with `http(s)://`, and any
 * links to anchor tags begin with `#`.
 */
export function Link({ url, children, className, openInNewTab = false, externalLinkIcon = false, ...otherProps }: ILinkProps) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const linkType: LinkType =
    url.startsWith('http://') || url.startsWith('https://') ? LinkType.EXTERNAL : url.startsWith('#') ? LinkType.ANCHOR : LinkType.INTERNAL;

  switch (linkType) {
    case LinkType.INTERNAL:
      return (
        <GatsbyLink className={clsx(classes.linkRoot, className)} target={openInNewTab ? '_blank' : undefined} to={url} {...otherProps}>
          {children}
        </GatsbyLink>
      );

    case LinkType.ANCHOR:
      return (
        <GatsbyLink className={clsx(classes.linkRoot, className)} to={`${pathname}${url}`} {...otherProps}>
          {children}
        </GatsbyLink>
      );

    case LinkType.EXTERNAL:
      return (
        <a
          className={clsx(classes.linkRoot, className, externalLinkIcon && classes.externalIcon)}
          href={url}
          target={openInNewTab ? '_blank' : undefined}
          {...otherProps}
        >
          {children}
        </a>
      );
  }
}
