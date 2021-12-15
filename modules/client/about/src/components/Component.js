
import { Header, Text } from '@ui.packages/client-kit';

import React from 'react';

import styles from './default.module.scss';


function Comments() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['col']}>
          <div className={styles['header']}>
            <Header>О компании</Header>
          </div>
          <div className={styles['info']}>
            <div className={styles['row']}>
              <Text>ИП "Максим Бибилов"</Text>
            </div>
            <div className={styles['row']}>
              <Text>Адрес: г. Симферополь, ул. Гавена 46</Text>
            </div>
            <div className={styles['row']}>
              <Text>Тел.: +7 (978) 590-60-60</Text>
            </div>
          </div>
        </div>
        <div className={styles['col']}>
          <div className={styles['header']}>
            <Header>Доставка</Header>
          </div>
          <div className={styles['info']}>
            <div className={styles['row']}>
              <Text type={Text.type.bold}>Бесплатная доставка осуществляется:</Text>
            </div>
            <div className={styles['row']}>
              <Text>Центральные районы - от 500 руб.</Text>
              <Text>Пригород - от 700 руб.</Text>
            </div>
            <div className={styles['row']}>
              <Text type={Text.type.bold}>При меньшей сумме цена за доставку составит:</Text>
            </div>
            <div className={styles['row']}>
              <Text>Центральные районы - 150 руб.</Text>
              <Text>Пригород - 250 руб.</Text>
            </div>
          </div>
        </div>
        <div className={styles['col']}>
          <div className={styles['header']}>
            <Header>Время работы</Header>
          </div>
          <div className={styles['info']}>
            <div className={styles['row']}>
              <Text>Заказы принимаются с 08:00 до 22:00</Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comments;
