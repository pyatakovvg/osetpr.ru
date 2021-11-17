
import { Header, Collapse } from "@ui.packages/mobile-kit";

import React from 'react';

import Time from './Time';
import Common from './Common';
import Delivery from './Delivery';

import styles from './default.module.scss';


function About() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <Header>Информация</Header>
        </div>
        <div className={styles['content']}>
          <div className={styles['row']}>
            <Collapse title={'О компании'}>
              <Common />
            </Collapse>
          </div>
          <div className={styles['row']}>
            <Collapse title={'Доставка'}>
              <Delivery />
            </Collapse>
          </div>
          <div className={styles['row']}>
            <Collapse title={'Время работы'}>
              <Time />
            </Collapse>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
