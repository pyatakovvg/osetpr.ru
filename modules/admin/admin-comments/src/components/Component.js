
import { selectInProcess } from '@modules/admin-orders';

import { Dialog } from '@ui.packages/dialog';
import { Header, Page, PageContent } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import List from './List';
import CommentModify from './CommentModify';

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

      <Dialog name={'comment-modify'}>
        <CommentModify />
      </Dialog>
    </Page>
  );
}

Comments.propTypes = {};

Comments.defaultProps = {};

export default Comments;
