/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { HeadProvider, Link, Meta, Title } from 'react-head';
import { useStaticQuery, graphql } from 'gatsby';

interface ISEOProps {
  description?: string;
  lang?: string;
  meta?: { name: string; content: string }[];
  title: string;
}

function SEO({ description, lang = 'en-US', meta, title }: ISEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  const pageTitle = title ? `${title} | Flarum Docs` : site.siteMetadata?.title;

  return (
    <>
      {/* Titles */}
      <Title>{pageTitle}</Title>
      <Meta name="og:title" content={pageTitle} />
      <Meta name="twitter:title" content={pageTitle} />

      {/* Descriptions */}
      <Meta name="description" content={metaDescription} />
      <Meta name="og:description" content={metaDescription} />
      <Meta name="twitter:description" content={metaDescription} />

      {/* Social cards */}
      <Meta name="og:type" content="website" />
      <Meta name="twitter:card" content="summary" />
      {/* {site.siteMetadata?.author && <Meta name="twitter:author" content={site.siteMetadata?.author} />} */}

      {/* Extra meta tags */}
      {meta?.map((tag, i) => (
        <Meta name={tag.name} key={`${tag.name}--${i}--${tag.content}`} content={tag.content} />
      ))}
    </>
  );
}

export default SEO;
