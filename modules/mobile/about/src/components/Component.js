
import { Header, Text } from "@ui.packages/mobile-kit";

import React from 'react';

import styles from './default.module.scss';


function About() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <Header>О нас</Header>
        </div>
        <div className={styles['content']}>
          <div className={styles['row']}>
            <Text>Заказы принимаются с 8:00 до 22:00</Text>
          </div>
          <div className={styles['row']}>
            <Text>Бесплатная доставка от 500 руб.</Text>
          </div>
          <br />
          <br />
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
    </section>
  );
}

export default About;
