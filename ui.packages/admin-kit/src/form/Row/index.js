
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function Row({ children, className }) {
  return (
    <span className={cn(className, styles['row'])}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {});
      })}
    </span>
  );
}

Row.propTypes = {
  className: types.string,
};

Row.defaultProps = {
  className: '',
};

export default Row;
