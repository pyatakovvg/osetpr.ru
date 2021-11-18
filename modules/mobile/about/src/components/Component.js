
import { Header, Collapse } from "@ui.packages/mobile-kit";

import React from 'react';
import { useLocation } from "react-router-dom";

import Time from './Time';
import Common from './Common';
import Delivery from './Delivery';

import styles from './default.module.scss';


function About() {
  const location = useLocation();
  const activeHash = location['hash'].replace('#', '');

  return (
    <section className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <Header>Информация</Header>
        </div>
        <div className={styles['content']}>
          <div className={styles['row']}>
            <Collapse title={'О компании'} defaultState={activeHash === 'about'}>
              <Common />
            </Collapse>
          </div>
          <div className={styles['row']}>
            <Collapse title={'Доставка'} defaultState={activeHash === 'delivery'}>
              <Delivery />
            </Collapse>
          </div>
          <div className={styles['row']}>
            <Collapse title={'Время работы'} defaultState={activeHash === 'time'}>
              <Time />
            </Collapse>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
