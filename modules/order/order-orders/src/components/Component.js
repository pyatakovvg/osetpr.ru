
import { selectInProcess } from '@modules/order-orders';

import { Header, Page, PageControls, PageContent, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Cards from './Cards';

import styles from './default.module.scss';


function Orders() {
  const navigate = useNavigate();
  const inProcess = useSelector(selectInProcess);

  function handleCreate() {
    navigate(process.env['PUBLIC_URL'] + '/orders/create');
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
          >Добавиьт заказ</Button>
        </div>
      </PageControls>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Заказы</Header>
          </div>
          <article className={styles['content']}>
            <Cards />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}



Orders.propTypes = {};

Orders.defaultProps = {};

export default Orders;
