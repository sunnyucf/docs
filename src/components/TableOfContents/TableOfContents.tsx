import { Link } from '@components/Link';
import { Heading } from '@components/Typography';
import useLocale from '@hooks/useLocale';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import type { IMdxPageContextWithoutBody } from '@templates/DocsPageTemplate';

interface ITableOfContentsProps {
  pageContext: IMdxPageContextWithoutBody;
}

const useTocStyles = makeStyles({
  tocRoot: {
    marginLeft: 8,
    marginBottom: 16,
    borderLeft: `4px solid var(--orange)`,
    padding: '20px 16px',
  },
  tocHeading: {
    marginTop: 0,
    // fontSize: '1.35rem',
  },
  tocList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,

    '& &': {
      paddingLeft: 16,
    },
  },
  tocListOutermost: {},
});

/**
 * Renders a table of contents using data from Gatsby's TOC GraphQL entry.
 */
export function TableOfContents({ pageContext }: ITableOfContentsProps) {
  const classes = useTocStyles();
  const locale = useLocale();

  if (!pageContext) {
    throw 'No `pageContext` was passed to the TableOfContents component. If being used in MDX files, ensure your usage matches: `<TableOfContents {...props} />`.';
  }

  const tocData = pageContext.tableOfContents.items;

  return (
    <nav className={classes.tocRoot}>
      <Heading variant="h2" lookAlikeVariant="h3" id="table-of-contents" className={classes.tocHeading}>
        {locale.trans('docsTemplate.tableOfContents.heading')}
      </Heading>

      <ul className={clsx(classes.tocList, classes.tocListOutermost)}>
        {tocData.map((items) => (
          <TableOfContentsItem key={items.url} data={items} />
        ))}
      </ul>
    </nav>
  );
}

interface ITableOfContentsItemProps {
  data: TableOfContentsItem;
}

function TableOfContentsItem({ data }: ITableOfContentsItemProps) {
  const classes = useTocStyles();

  return (
    <li>
      <Link url={data.url}>{data.title}</Link>
      {data.items && (
        <ul className={classes.tocList}>
          {data.items.map((item) => (
            <TableOfContentsItem key={item.url} data={item} />
          ))}
        </ul>
      )}
    </li>
  );
}
