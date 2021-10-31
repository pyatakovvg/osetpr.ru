
import { Header, Text, Button } from '@ui.packages/mobile-kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './default.module.scss';


function Empty() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(process.env['PUBLIC_URL'] + '/');
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['overlay']}>
        <div className={styles['header']}>
          <Header>В корзине пока ничего нет</Header>
        </div>
        <div className={styles['content']}>
          <Text>Начните с главной страницы</Text>
        </div>
      </div>
      <div className={styles['controls']}>
        <Button onClick={() => handleClick()}>Перейти на главную</Button>
      </div>
    </div>
  );
}

export default Empty;
