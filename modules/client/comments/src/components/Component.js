
import { createComment } from '@modules/client-comments';

import { Header, Text } from '@ui.packages/client-kit';
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
      <div className={styles['header']}>
        <Header level={1}>Комментарии</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['description']}>
          <Text>Мы будем рады приветствовать Вас в ресторане Москвы «Сахара», где можно окунуться в удивительную атмосферу уюта и тепла. В данном разделе собраны отзывы о нашем заведении, где Вы также можете поделиться впечатлением об обслуживании и приготовленной еде. Ваше мнение позволит нам стать лучше!</Text>
          <Text>Приветствуются воспевания и похвала, но и критика воспринимается адекватно. Будем благодарны за конструктивные пожелания и стремление улучшить работу нашей сети. Ознакомившись с отзывами, присутствующими ниже, Вы сможете понять целесообразность посещения ресторана или оформления доставки. Все сообщения сразу отправляются управляющему, который обязательно предпримет меры по улучшению обслуживания.</Text>
          <Text>Ресторан «Сахара» приглашает Вас опробовать блюда русской, кавказской, японской, паназиатской и азербайджанской кухонь. Порадует эксклюзивностью, непередаваемым вкусом и удивительной подачей. Прикладываются особые усилия для того, чтобы каждый клиент остался доволен проделанной работой и оставил положительный отзыв в данном разделе сайта.</Text>
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
