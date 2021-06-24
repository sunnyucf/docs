import * as React from 'react';

import type { LocationContext } from '@gatsbyjs/reach-router';
import { ScrollContext } from 'gatsby-react-router-scroll';
import { RecoilRoot } from 'recoil';

import { Header } from './Header';
import { Footer } from './Footer';

interface ILayoutProps {
  children: React.ReactNode;
  /**
   * Removes the footer.
   *
   * **Should only be used if the footer is reinserted within the child element hierachy.**
   */
  noFooter: boolean;
  location: LocationContext;
}

export default function Layout({ children, noFooter = false, location }: ILayoutProps) {
  return (
    <ScrollContext location={location}>
      <RecoilRoot>
        <Header />

        {children}

        {!noFooter && <Footer />}
      </RecoilRoot>
    </ScrollContext>
  );
}
