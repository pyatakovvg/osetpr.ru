
import { selectInProcess } from '@modules/admin-products';

import { selectProfile } from "@ui.packages/application";
import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Table from './Table';

import styles from './default.module.scss';


function Orders() {
  const profile = useSelector(selectProfile);
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {

  }

  return (
    <Page inProcess={inProcess}>
      {(profile['role']['code'] !== 'performer') && (
        <PageControls>
          <div className={styles['controls']}>
            <Button
              form={Button.FORM_CREATE}
              mode={Button.MODE_SUCCESS}
              disabled={inProcess}
              onClick={() => handleCreate()}
            >Добавиьт товар</Button>
          </div>
        </PageControls>
      )}
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Товары</Header>
          </div>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Orders.propTypes = {};

Orders.defaultProps = {};

export default Orders;
