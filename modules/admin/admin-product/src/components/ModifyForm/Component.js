
import React from 'react';

import Common from './Common';
import Gallery from './Gallery';
import Options from './Options';

import styles from './default.module.scss';


function ModifyForm({ handleSubmit }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['section']}>
          <Gallery />
        </div>
        <div className={styles['section']}>
          <Common />
        </div>
        <div className={styles['section']}>
          <Options />
        </div>
      </div>
    </form>
  );
}

export default ModifyForm;
