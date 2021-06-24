import React from 'react';
import { makeStyles } from '@material-ui/styles';

import type { LocationContext } from '@gatsbyjs/reach-router';
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '@components/Layout';
import SEO from '@components/SEO';
import { MdxLinkInterop } from '@components/Link';
import { MdxHeadingInterop } from '@components/Typography';
import { TableOfContents } from '@components/TableOfContents';

import '@css/docs-page.less';

const MdxShortcodes: MDXProviderComponentsProp = {
  a: MdxLinkInterop,
  h1: MdxHeadingInterop('h1'),
  h2: MdxHeadingInterop('h2'),
  h3: MdxHeadingInterop('h3'),
  h4: MdxHeadingInterop('h4'),
  h5: MdxHeadingInterop('h5'),
  h6: MdxHeadingInterop('h6'),
  TableOfContents,
  DocsPageInfo: (props) => {
    console.log(props);
    return null;
  },
};

const useStyles = makeStyles({
  main: {
    maxWidth: 740,
    margin: 'auto',
    padding: 16,
  },
});

export interface IMdxPageContext {
  frontmatter: {
    /**
     * The article locale, defined in frontmatter.
     */
    locale: string;
    /**
     * The page title, defined in frontmatter.
     */
    title: string;
  };

  /**
   * A list of all headings in the document, down to a depth of H3.
   */
  tableOfContents: { items: TableOfContents };
  /**
   * An estimated time needed to read this article in minutes.
   */
  timeToRead: number;
  /**
   * An excerpt from the markdown file, used for SEO.
   */
  excerpt: string;
  /**
   * Post body content.
   */
  body: string;
  /**
   * Date that the markdown file was last edited.
   */
  lastModified: Date;
}

export type IMdxPageContextWithoutBody = Omit<IMdxPageContext, 'body'>;

interface IDocsPageTemplateProps {
  pageContext: IMdxPageContext;
  location: LocationContext;
}

export default function DocsPageTemplate({ pageContext, location }: IDocsPageTemplateProps) {
  const classes = useStyles();

  console.log('location', location);

  const { body: _, ...contextNoBody } = pageContext;

  return (
    <Layout location={location}>
      <SEO title={pageContext.frontmatter.title} description={pageContext.excerpt} />

      <main className={classes.main}>
        <nav></nav>

        <article className="docs-article">
          <MDXProvider components={MdxShortcodes}>
            <MDXRenderer pageContext={contextNoBody}>{pageContext.body}</MDXRenderer>
          </MDXProvider>
        </article>
      </main>
    </Layout>
  );
}
