
import { selectInProcess } from '@modules/admin-orders';

import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isPristine, isValid, reset, submit } from "redux-form";

import FormModify from './FormModify';

import styles from './default.module.scss';


function PlanModify() {
  const params = useParams();
  const dispatch = useDispatch();

  const valid = useSelector(isValid('plan-modify'));
  const pristine = useSelector(isPristine('plan-modify'));
  const inProcess = useSelector(selectInProcess);

  function handleSubmit() {
    dispatch(submit('plan-modify'));
  }

  function handleReset() {
    dispatch(reset('plan-modify'));
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
          >{ params['uuid'] ? 'Обновить' : 'Сохранить' }</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>{ params['uuid'] ? 'Обновить план' : 'Создать план' }</Header>
          </div>
          <article className={styles['content']}>
            <FormModify />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

PlanModify.propTypes = {};

PlanModify.defaultProps = {};

export default PlanModify;
