import React from 'react';

import { Link } from './';

interface IMdxLinkInteropProps {
  href: string;
  children: React.ReactNode;
}

export function MdxLinkInterop({ href, children, ...props }: IMdxLinkInteropProps) {
  return (
    <Link url={href} externalLinkIcon {...props}>
      {children}
    </Link>
  );
}
