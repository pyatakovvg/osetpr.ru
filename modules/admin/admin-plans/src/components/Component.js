
import { selectInProcess } from '@modules/admin-plans';

import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Table from './Table';

import styles from './default.module.scss';


function Plans() {
  const navigate = useNavigate();

  const inProcess = useSelector(selectInProcess);

  function handleCreate() {
    navigate(process.env['PUBLIC_URL'] + '/plans/create');
  }

  return (
    <Page inProcess={inProcess}>
      <PageControls>
        <div className={styles['controls']}>
          <Button
            form={Button.FORM_CREATE}
            mode={Button.MODE_SUCCESS}
            disabled={inProcess}
            onClick={() => handleCreate()}
          >Добавить план</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Планы</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Plans.propTypes = {};

Plans.defaultProps = {};

export default Plans;
