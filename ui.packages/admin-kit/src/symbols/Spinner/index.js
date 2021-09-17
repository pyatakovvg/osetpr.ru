
import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function Spinner({ className, mode }) {
  const classNameImageWrapper = cn(className, styles['spinner'], {
    [styles['wrapper--primary']]: mode === PRIMARY_MODE,
    [styles['wrapper--success']]: mode === SUCCESS_MODE,
    [styles['wrapper--info']]: mode === INFO_MODE,
    [styles['wrapper--danger']]: mode === DANGER_MODE,
    [styles['wrapper--warning']]: mode === WARNING_MODE,
  });

  return (
    <div className={classNameImageWrapper}>
      <div className={styles['dot1']} />
      <div className={styles['dot2']} />
    </div>
  );
}

Spinner.propTypes = {
  className: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
};

Spinner.defaultProps = {
  className: '',
  mode: 'default',
};

export default Spinner;
