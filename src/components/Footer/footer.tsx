import React from 'react';

import { Link } from '@components/Link';

import PackageJson from '../../../package.json';

export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Stichting Flarum (Flarum Foundation). Licensed under the MIT license.</p>
      <p>
        Docs site version {PackageJson.version}. <Link url="https://github.com/flarum/docs">View this site on GitHub</Link>
      </p>
    </footer>
  );
}
