import useLocale from '@hooks/useLocale';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import type { IMdxPageContextWithoutBody } from '@templates/DocsPageTemplate';

import ClockIcon from '@assets/icons/clock.inline.svg';
import dayjs from 'dayjs';

import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(dayjsLocalizedFormat);

interface IDocsPageInfoProps {
  pageContext: IMdxPageContextWithoutBody;
}

const useStyles = makeStyles({
  root: {
    color: 'var(--grey-text)',
    marginTop: -24,
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'var(--grey)',
    height: '1em',
  },
});

/**
 * Shows some article metadata.
 */
export function DocsPageInfo({ pageContext }: IDocsPageInfoProps) {
  const classes = useStyles();
  const locale = useLocale();

  if (!pageContext) {
    throw 'No `pageContext` was passed to the TableOfContents component. If being used in MDX files, ensure your usage matches: `<TableOfContents {...props} />`.';
  }

  const tocData = pageContext.tableOfContents.items;

  return (
    <aside className={classes.root}>
      <p>{pageContext.timeToRead} mins to read</p>
      <p>{dayjs(pageContext.lastModified).format(locale.trans('docsPageInfo.lastModified.dayjsTemplate'))}</p>
    </aside>
  );
}
