
import { selectInProcess } from '@modules/client-comments';

import { Button, Header, InputField, TextareaFieldField } from '@ui.packages/client-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function CommentForm({ handleSubmit, valid, pristine }) {
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header level={2}>Оставить комментарий</Header>
        </div>
        <div className={styles['row']}>
          <InputField require name={'user'} label={'Представтесь'} />
        </div>
        <div className={styles['row']}>
          <TextareaFieldField require name={'content'} label={'Комментарий'} />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          mode={'success'}
          inProcess={inProcess}
          disabled={ ! valid || pristine}
        >Сохранить</Button>
      </div>
    </form>
  );
}

export default CommentForm;
