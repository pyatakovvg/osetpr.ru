
import { Mode } from '@ui.packages/types';
import { selectInProcess } from '@ui.packages/admin-application';
import { InputField, Header, Button } from '@ui.packages/admin-kit'

import React from 'react';
import { useSelector } from 'react-redux';
import { isValid, isPristine } from 'redux-form';

import styles from "./default.module.scss";


function Form({ handleSubmit }) {
  const valid = useSelector(isValid('sign-in'));
  const pristine = useSelector(isPristine('sign-in'));
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['dialog']} onSubmit={handleSubmit}>
      <div className={styles['header']}>
        <Header level={4}>Вход в личный кабинет</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['row']}>
          <InputField name="login" label="Логин" />
        </div>
        <div className={styles['row']}>
          <InputField name="password" label="Пароль" type="password" />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_SUBMIT}
          mode={Mode.PRIMARY}
          disabled={ ! valid || pristine || inProcess}
        >Войти в кабинет</Button>
      </div>
    </form>
  );
}

export default Form;
