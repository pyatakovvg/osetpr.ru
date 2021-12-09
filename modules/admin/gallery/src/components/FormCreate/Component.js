
import { Mode } from '@ui.packages/types';
import { Button, Text } from '@ui.packages/admin-kit';

import React from 'react';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';

import ImagesField from './ImagesField';

import styles from './default.module.scss';

import { selectInCreateProcess } from '../../ducks/slice';


export default ({ handleSubmit, valid, pristine }) => {
  const inProcess = useSelector(selectInCreateProcess);

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Field name="files" component={ImagesField} />
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_SUBMIT}
          mode={Mode.SUCCESS}
          disabled={ ! valid || pristine || inProcess}
        >Выполнить</Button>
      </div>
      <div className={styles['description']}>
        <Text type={Text.TYPE_COMMENT}>Перетащите в форму файлы изображения<br/>или нажмите на кнопку "Добавить"</Text>
      </div>
    </form>
  )
};
