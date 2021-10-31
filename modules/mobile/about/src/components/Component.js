
import { Header } from "@ui.packages/mobile-kit";

import React from 'react';

import styles from './default.module.scss';


function About() {
  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>О нас</Header>
        </div>
      </div>
    </section>
  );
}

export default About;
