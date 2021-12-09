
import { updateGroups, selectInProcess, selectItems } from '@modules/admin-group';

import { Header, Button, Page, PageControls, PageContent } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isPristine, isValid, reset, submit } from "redux-form";

import FormModify from './FormModify';

import styles from './default.module.scss';


const FORM_NAME = 'group-modify';


function Category() {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const inProcess = useSelector(selectInProcess);

  const valid = useSelector(isValid(FORM_NAME));
  const pristine = useSelector(isPristine(FORM_NAME));


  function handleSubmitGroups(data) {
    dispatch(updateGroups(data));
  }

  function handleSubmit() {
    dispatch(submit(FORM_NAME));
  }

  function handleReset() {
    dispatch(reset(FORM_NAME));
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CONTEXT}
            mode={Button.MODE_PRIMARY}
            disabled={pristine || inProcess}
            onClick={handleReset}
          >Отмена</Button>
          <Button
            type={Button.TYPE_BUTTON}
            disabled={ ! valid || pristine || inProcess}
            mode="success"
            onClick={handleSubmit}
          >Сохранить</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Группа товара</Header>
          </div>
          <article className={styles['content']}>
            <FormModify
              initialValues={{
                bulk: items,
              }}
              onSubmit={(data) => handleSubmitGroups(data)}
            />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

export default Category;
