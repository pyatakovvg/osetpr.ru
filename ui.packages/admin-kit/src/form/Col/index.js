
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function Col({ className, children }) {
  const colClassName = cn(styles['col'], className);

  return (
    <span className={colClassName}>
      <span className={styles['wrapper']}>
        {children && React.Children.map(children, (child) => {
          return child && React.cloneElement(child, {});
        })}
      </span>
    </span>
  );
}

Col.propTypes = {
  className: types.string,
};

Col.defaultProps = {
  className: '',
};

export default Col;
