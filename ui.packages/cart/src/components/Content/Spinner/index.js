
import { Text } from '@ui.packages/admin-kit';

import React from 'react';

import cn from 'classnames';
import styles from './defaults.module.scss';


function Spinner() {
  return (
    <span className={styles['spinner']}>
      <span className={cn(styles['icon'], "fas fa-spinner", "fa-spin")} />
      <Text type={Text.TYPE_BODY}>Немного терпения</Text>
    </span>
  );
}

Spinner.propTypes = {};

Spinner.defaultProps = {};

export default Spinner;
