
import { Text } from '@ui.packages/mobile-kit';

import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


function Basket() {
  return (
    <div className={styles['attention']}>
      <div className={styles['type']}>
        <span className={cn(styles['icon'], 'fas fa-exclamation')} />
      </div>
      <div className={styles['content']}>
        <Text>Бесплатная доставка от 500 руб.</Text>
        <Text type={Text.type.bold}>Стоимость доставки 150 руб.</Text>
        <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/about#delivery'}>Подробнее в разделе информации</Link>
      </div>
    </div>
  );
}

export default memo(Basket);
