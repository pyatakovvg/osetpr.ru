
import { selectMeta } from '@modules/client-main';

import { Header } from '@ui.packages/client-kit';
import { nounDeclension } from '@ui.packages/utils';

import React from 'react';
import { useSelector } from 'react-redux';

import FilterReset from "./FilterReset";

import styles from './default.module.scss';


function Aside() {
  const meta = useSelector(selectMeta);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['controls']}>
        <div className={styles['reset']}>
          <FilterReset />
        </div>
      </div>
      {meta && !! meta['total'] && (
        <div className={styles['count']}>
          <Header level={3}>{ meta['total'] } { nounDeclension(meta['total'], ['товар', 'товара', 'товаров']) }</Header>
        </div>
      )}
    </div>
  );
}

export default Aside;
