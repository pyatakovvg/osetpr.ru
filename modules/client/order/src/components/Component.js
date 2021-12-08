
import { Header, Page, PageContent } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


function Attributes() {
  return (
    <Page>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Тут будет витрина магазина</Header>
          </div>
        </section>
      </PageContent>
    </Page>
  );
}



Attributes.propTypes = {};

Attributes.defaultProps = {};

export default Attributes;
