
import React from 'react';
import types from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function Hr({ s }) {
  return (
    <span className={cn(styles['hr'], className)} />
  );
}

Hr.propTypes = {
  className: types.string,
};

Hr.defaultProps = {
  className: null,
};

export default Hr;
