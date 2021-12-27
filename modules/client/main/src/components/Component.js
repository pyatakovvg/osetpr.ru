
import { Text, Header } from '@ui.packages/client-kit';

import React from 'react';

import Aside from './Aside';
import Filter from './Filter';
import Products from './Products';

import styles from './default.module.scss';


function Main() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['controls']}>
        <aside className={styles['filter']}>
          <Filter />
        </aside>
        <article className={styles['content']}>
          <Aside />
          <Products />
        </article>
      </div>
      <div className={styles['footer']}>
        <div className={styles['header']}>
          <Header level={2}>Доставка еды "Осетинская кухня" по городу Симферополь</Header>
        </div>
        <div className={styles['text']} role="contentinfo">
          <Text>Доставка еды осетинской кухни в Симферополе. Это хороший выбор порадовать себя чем-то вкусным и разнообразным. А почему? Потому что вы не будете тратить время и силы на поиск подходящего кафе или ресторана, не нужно идти в магазин за продуктами и тратить время на приготовление еды, не надо никуда ехать, особенно если погода не радует. Вам всего лишь нужно выбрать готовые блюда в меню и насладиться кухней осетии!</Text>
        </div>
      </div>
    </section>
  );
}

export default Main;
