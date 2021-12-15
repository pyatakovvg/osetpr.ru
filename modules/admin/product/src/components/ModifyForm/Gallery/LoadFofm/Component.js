
import { Mode } from '@ui.packages/types';
import { Button, Text } from '@ui.packages/admin-kit';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, submit } from 'redux-form';

import ImagesField from './ImagesField';

import styles from './default.module.scss';


export default ({ handleSubmit, valid, pristine }) => {
  const dispatch = useDispatch();

  function handleSubmitForm() {
    dispatch(submit('gallery-create'));
  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Field name="files" component={ImagesField} />
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_BUTTON}
          mode={Mode.SUCCESS}
          disabled={ ! valid || pristine}
          onClick={() => handleSubmitForm()}
        >Выполнить</Button>
      </div>
      <div className={styles['description']}>
        <Text type={Text.TYPE_COMMENT}>Перетащите в форму файлы изображения<br/>или нажмите на кнопку "Добавить"</Text>
      </div>
    </form>
  )
};
