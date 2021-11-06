
import { queryToObject } from '@ui.packages/utils';
import { Header, Button } from '@ui.packages/mobile-kit';

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Categories from './Category';

import styles from './default.module.scss';


function FilterForm({ onChange }) {
  const location = useLocation();
  const query = queryToObject(location['search']);
  const categoryQuery = query['categoryId']
    ? (query['categoryId'] instanceof Array)
      ? query['categoryId']
      : [query['categoryId']]
    : [];

  const [categories, setCategories] = useState(categoryQuery);

  function handleChangeCategories(value) {
    setCategories(value);
  }

  function handleSubmit() {
    onChange && onChange({
      categoryId: categories,
    });
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Установить фильтр</Header>
        </div>
        <div className={styles['filters']}>
          <Categories
            values={categories}
            onChange={(value) => handleChangeCategories(value)}
          />
        </div>
      </div>
      <div className={styles['controls']}>
        <Button
          mode={'success'}
          onClick={() => handleSubmit()}
        >Установить</Button>
      </div>
    </div>
  );
}

export default FilterForm;
