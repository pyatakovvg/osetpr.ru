
import { Spinner } from '@ui.packages/admin-kit';

import React from "react";

import styles from './default.module.scss';


function SpinnerDialog() {
  return (
    <div className={styles['wrapper']}>
      <Spinner />
    </div>
  );
}

export default SpinnerDialog;
