
import { selectInProcess } from '@modules/admin-orders';

import { Header, Page, PageContent } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import List from './List';

import styles from './default.module.scss';


function Comments() {
  const inProcess = useSelector(selectInProcess);

  return (
    <Page inProcess={inProcess}>
      <PageContent>
        <section className={styles['wrapper']}>
          <div className={styles['header']}>
            <Header level={1}>Комментарии</Header>
          </div>
          <article className={styles['content']}>
            <List />
          </article>
        </section>
      </PageContent>
    </Page>
  );
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
