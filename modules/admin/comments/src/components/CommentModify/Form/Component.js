
import { Header, Button, TextareaField } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


function DialogModify({ handleSubmit, valid, pristine }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['header']}>
        <Header level={3}>Коментарий</Header>
      </div>
      <div className={styles['content']}>
        <TextareaField name={'content'} />
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_SUBMIT}
          mode={Button.MODE_SUCCESS}
          disabled={ ! valid || pristine}
        >Сохранить</Button>
      </div>
    </form>
  );
}

export default DialogModify;
