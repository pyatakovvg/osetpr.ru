
import { selectInProcess } from '@modules/admin-customer';

import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isPristine, isValid, reset, submit } from "redux-form";

import FormModify from './FormModify';

import styles from './default.module.scss';


function Customer() {
  const dispatch = useDispatch();

  const valid = useSelector(isValid('customer-modify'));
  const pristine = useSelector(isPristine('customer-modify'));
  const inProcess = useSelector(selectInProcess);

  function handleSubmit() {
    dispatch(submit('customer-modify'));
  }

  function handleReset() {
    dispatch(reset('customer-modify'));
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CONTEXT}
            mode={Button.MODE_PRIMARY}
            disabled={pristine || inProcess}
            onClick={() => handleReset()}
          >Отменить</Button>
          <Button
            mode={Button.MODE_SUCCESS}
            disabled={ ! valid || pristine || inProcess}
            onClick={() => handleSubmit()}
          >Сохранить</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Редактирование клиента</Header>
          </div>
          <article className={styles['content']}>
            <FormModify />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Customer.propTypes = {};

Customer.defaultProps = {};

export default Customer;
