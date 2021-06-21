import * as React from 'react';

import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

import FlarumLogo from '@assets/branding/wordmark.svg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 56,
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '#eee solid 1px',
  },
  logo: {
    height: '100%',
  },
  nav: {
    display: 'flex',
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <img className={classes.logo} src={FlarumLogo} />

      <nav className={classes.nav}></nav>
    </header>
  );
}
