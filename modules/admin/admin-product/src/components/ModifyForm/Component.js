
import React from 'react';

import Types from './Types';
import Common from './Common';
import Gallery from './Gallery';
import Modes from './Modes';

import styles from './default.module.scss';


function ModifyForm({ handleSubmit }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['section']}>
          <Gallery />
        </div>
        <div className={styles['section']}>
          <Types />
        </div>
        <div className={styles['section']}>
          <Common />
        </div>
        <div className={styles['section']}>
          <Modes />
        </div>
      </div>
    </form>
  );
}

export default ModifyForm;
