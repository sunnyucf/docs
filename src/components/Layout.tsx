import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Header } from './Header';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>FOOTER</footer>
    </>
  );
}
