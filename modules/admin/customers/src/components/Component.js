
import { selectInProcess } from '@modules/admin-customers';

import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';


function Attributes() {
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {

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
          >Добавиьт клиента</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Клиенты</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}



Attributes.propTypes = {};

Attributes.defaultProps = {};

export default Attributes;
