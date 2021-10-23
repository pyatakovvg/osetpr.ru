
import React from 'react';

import logotype from './Logotype.svg';

import styles from './default.module.scss';


function Main() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <img className={styles['logotype']} src={logotype} width={200} height={200} alt={''} />
        <div className={styles['description']}>
          <p className={styles['text']}>Магазин находится в разработке</p>
          <p className={styles['text-2']}>По вопросам сотрудничества, заказов и доставки, обращаться по номеру телефона</p>
          <p className={styles['phone']}>+ 7 (978) 590-60-60</p>
          {/*<a className={styles['link']} href={'https://order.osetpr.ru'} rel={'noopener'} target="_blank">Кабинет партнера</a>*/}
        </div>
      </div>
    </section>
  );
}

export default Main;
