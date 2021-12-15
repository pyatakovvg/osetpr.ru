
import { selectInProcess } from '@modules/admin-orders';

import { Header, Page, PageContent } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import Filter from './Filter';
import Table from './Table';

import styles from './default.module.scss';


function Orders() {
  const inProcess = useSelector(selectInProcess);

  return (
    <Page inProcess={inProcess}>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Заказы</Header>
          </div>
          <aside className={styles['filter']}>
            <Filter />
          </aside>
          <article className={styles['content']}>
            <Table />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

export default Orders;
