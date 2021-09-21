
import { selectInProcess } from '@modules/order-order-modify';

import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, submit, isValid, isPristine } from 'redux-form';

import FormModify from './FormModify';

import styles from './default.module.scss';


function OrderModify() {
  const dispatch = useDispatch();

  const valid = useSelector(isValid('order-modify'));
  const pristine = useSelector(isPristine('order-modify'));
  const inProcess = useSelector(selectInProcess);

  function handleSubmit() {
    dispatch(submit('order-modify'));
  }

  function handleReset() {
    dispatch(reset('order-modify'));
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
            <Header level={1}>Заказы</Header>
          </div>
          <article className={styles['content']}>
            <FormModify />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

OrderModify.propTypes = {};

OrderModify.defaultProps = {};

export default OrderModify;
