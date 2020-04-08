import React from 'react';
import PropTypes from 'prop-types';

import theme from './theme.module.css';

export default function withTheme(Component) {
  return function ThemedComponent(props) {
    return (
      <Component
        theme={theme}
        {...props}
      />
    );
  };
}

export { theme };

export const ThemeProps = PropTypes.shape({});
