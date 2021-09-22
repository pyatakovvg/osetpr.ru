
import { Header, Page, PageContent } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


function Main() {
  return (
    <Page>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Доступные разделы</Header>
          </div>
          <article className={styles['content']}>
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Main.propTypes = {};

Main.defaultProps = {};

export default Main;
