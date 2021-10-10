
import { selectInProcess } from '@modules/order-order';

import { Header, Page, PageContent } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import FormModify from './FormModify';

import styles from './default.module.scss';


function OrderModify() {
  const inProcess = useSelector(selectInProcess);

  return (
    <Page inProcess={inProcess}>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Настройки пользователя</Header>
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
