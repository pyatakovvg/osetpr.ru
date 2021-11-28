
import { Text, Logotype } from '@ui.packages/mobile-kit';

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './default.module.scss';


export default function Information() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['logotype']}>
        <Logotype type={'circle'} />
      </div>
      <Text>Запрашиваемая страница<br/>не найдена</Text>
      <div className={styles['controls']}>
        <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/'}>Вернуться на главную</Link>
      </div>
    </div>
  );
}
