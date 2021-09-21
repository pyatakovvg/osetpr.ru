
import { selectStep, nextStepAction } from '@modules/order-sign-up';

import { Mode } from '@ui.packages/types';
import { Header, Button } from '@ui.packages/admin-kit';
import { selectInProcess } from '@ui.packages/application';

import React from 'react';
import { isValid, isPristine } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';

import Step1 from './Step1';
import Step2 from './Step2';

import styles from "./default.module.scss";


function Form({ handleSubmit }) {
  const dispatch = useDispatch();

  const step = useSelector(selectStep);
  const inProcess = useSelector(selectInProcess);

  const valid = useSelector(isValid('sign-in'));
  const pristine = useSelector(isPristine('sign-in'));

  function nextStep() {
    dispatch(nextStepAction());
  }

  return (
    <form className={styles['dialog']} onSubmit={handleSubmit}>
      <div className={styles['header']}>
        <Header level={4}>Регистрация</Header>
      </div>
      <div className={styles['content']}>
        {(step === 1) && <Step1 />}
        {(step === 2) && <Step2 />}
      </div>
      <div className={styles['controls']}>
        {(step === 1) && (
          <Button
            mode={Button.MODE_PRIMARY}
            disabled={ ! valid || pristine}
            onClick={() => nextStep()}
          >Далее</Button>
        )}
        {(step === 2) && (
          <Button
            type={Button.TYPE_SUBMIT}
            mode={Mode.PRIMARY}
            disabled={ ! valid || pristine || inProcess}
          >Зарегистрировать</Button>
        )}
      </div>
    </form>
  );
}

export default Form;
