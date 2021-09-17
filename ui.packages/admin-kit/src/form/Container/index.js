
import React from 'react';
import types from "prop-types";

import cn from 'classnames';
import styles from './default.module.scss';


function Container({ children, className }) {
  const classNameWrapper = cn(styles['container'], className);
  return (
    <span className={classNameWrapper}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {});
      })}
    </span>
  );
}

Container.propTypes = {
  className: types.string,
};

Container.defaultProps = {
  className: '',
};

export default Container;
