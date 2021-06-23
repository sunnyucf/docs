import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '@components/Layout';
import SEO from '@components/SEO';
import { TableOfContents } from '../../@types/global';
import { graphql } from 'gatsby';

import '@css/docs-page.less';

const MdxShortcodes: MDXProviderComponentsProp = {};

const useStyles = makeStyles({
  main: {
    maxWidth: 900,
    margin: 'auto',
    padding: 16,
  },
});

interface IDocsPageTemplateProps {
  pageContext: {
    /**
     * The article locale, defined in frontmatter.
     */
    locale: 'en';
    /**
     * A list of all headings in the document, down to a depth of H3.
     */
    tableOfContents: TableOfContents;
    /**
     * An estimated time needed to read this article in minutes.
     */
    timeToRead: number;
    /**
     * The page title, defined in frontmatter.
     */
    title: string;
    /**
     * An excerpt from the markdown file, used for SEO.
     */
    excerpt: string;
  };
  data: {
    mdx: any;
  };
}

export default function DocsPageTemplate({ pageContext, data }: IDocsPageTemplateProps) {
  const classes = useStyles();

  return (
    <Layout>
      <SEO title={pageContext.title} description={pageContext.excerpt} />

      <main className={classes.main}>
        <nav></nav>

        <article className="docs-article">
          <MDXProvider components={MdxShortcodes}>
            <MDXRenderer frontmatter={data?.mdx?.frontmatter}>{data?.mdx?.body}</MDXRenderer>
          </MDXProvider>
        </article>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query MDXQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`;
