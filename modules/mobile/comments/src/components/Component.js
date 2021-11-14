
import { selectData, createComment } from '@modules/mobile-comments';

import { Header } from "@ui.packages/mobile-kit";
import { Dialog, closeDialog } from "@ui.packages/mobile-dialog";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from './Form';
import Empty from './Empty';
import Comment from './Comment';

import styles from './default.module.scss';


function Comments() {
  const dispatch = useDispatch();

  const items = useSelector(selectData);

  async function handleCreateComment(data) {
    const isCreated = await dispatch(createComment(data));

    if (isCreated) {
      dispatch(closeDialog());
    }
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <Header>Отзывы</Header>
        </div>
        <div className={styles['content']}>
          { ! items.length && (
            <Empty />
          )}
          {items.map((item) => (
            <Comment key={item['uuid']} {...item} />
          ))}
        </div>
      </div>

      <Dialog name={'add-comment'}>
        <Form onSubmit={(data) => handleCreateComment(data)} />
      </Dialog>
    </section>
  );
}

export default Comments;
