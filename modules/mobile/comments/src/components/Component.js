
import { selectData } from '@modules/mobile-comments';

import { Header } from "@ui.packages/mobile-kit";
import { Dialog } from "@ui.packages/mobile-dialog";

import React from 'react';
import { useSelector } from 'react-redux';

import Form from './Form';
import Comment from './Comment';

import styles from './default.module.scss';


function Comments() {
  const items = useSelector(selectData);
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Отзывы</Header>
        </div>
        <div className={styles['comments']}>
          {items.map((item) => (
            <Comment key={item['uuid']} {...item} />
          ))}
        </div>
      </div>

      <Dialog name={'add-comment'}>
        <Form onSubmit={() => {}} />
      </Dialog>
    </section>
  );
}

export default Comments;
