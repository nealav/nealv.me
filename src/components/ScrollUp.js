import React from 'react';
import ScrollToTop from 'react-scroll-up';

import withTheme, { ThemeProps } from '../theme/Theme';
import classNames from '../utils/classNames';

import classes from './css/ScrollUp.module.css';

export function ScrollUp({
  theme,
}) {
  return (
    <ScrollToTop
      showUnder={160}
      style={{
        bottom: '70px',
      }}
    >
      <div className={classNames(classes.container, theme.button)}>
        up ↑
      </div>
    </ScrollToTop>
  );
}

ScrollUp.propTypes = {
  theme: ThemeProps.isRequired,
};

export default withTheme(ScrollUp);
