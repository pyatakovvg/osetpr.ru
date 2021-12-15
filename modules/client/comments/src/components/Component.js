
import { createComment } from '@modules/client-comments';

import { Text } from '@ui.packages/client-kit';
import { closeDialog, Dialog } from '@ui.packages/client-dialog';

import React from 'react';
import { useDispatch } from 'react-redux';

import Form from './Form';
import Comments from './Comments';
import Controls from './Controls';

import styles from './default.module.scss';


function CommentsContent() {
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    const isSuccess = await dispatch(createComment(data));
    if (isSuccess) {
      dispatch(closeDialog());
    }
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['description']}>
          <Text>Мы рады приветствовать Вас в нашем сервисе. В данном разделе собраны отзывы о нашем продукте, где Вы также можете поделиться впечатлением об обслуживании и приготовленной еде. Ваше мнение позволит нам стать лучше!</Text>
          <Text>Приветствуются воспевания и похвала, но и критика воспринимается адекватно. Будем благодарны за конструктивные пожелания и стремление улучшить нашу работу. Ознакомившись с отзывами, присутствующими ниже, Вы сможете понять целесообразность оформления доставки и попробовать нашу кухню. Все сообщения сразу отправляются управляющему, который обязательно предпримет меры по улучшению обслуживания.</Text>
        </div>
        <div className={styles['controls']}>
          <Controls />
        </div>
        <div className={styles['comments']}>
          <Comments />
        </div>
      </div>

      <Dialog name={'create-comment'}>
        <Form onSubmit={handleSubmit} />
      </Dialog>
    </section>
  );
}

export default CommentsContent;
