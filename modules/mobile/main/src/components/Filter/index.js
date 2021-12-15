
import { queryToObject } from '@ui.packages/utils';
import { Header, Button } from '@ui.packages/mobile-kit';

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Groups from './Group';
import Categories from './Category';

import styles from './default.module.scss';


function FilterForm({ onChange }) {
  const location = useLocation();
  const query = queryToObject(location['search']);
  const groupQuery = query['groupUuid']
    ? (query['groupUuid'] instanceof Array)
      ? query['groupUuid']
      : [query['groupUuid']]
    : [];
  const categoryQuery = query['categoryUuid']
    ? (query['categoryUuid'] instanceof Array)
      ? query['categoryUuid']
      : [query['categoryUuid']]
    : [];

  const [groups, setGroups] = useState(groupQuery);
  const [categories, setCategories] = useState(categoryQuery);

  function handleChangeGroups(value) {
    setGroups(value);
  }

  function handleChangeCategories(value) {
    setCategories(value);
  }

  function handleSubmit() {
    onChange && onChange({
      groupUuid: groups,
      categoryUuid: categories,
    });
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <Header>Установить фильтр</Header>
        </div>
        <div className={styles['filters']}>
          <div className={styles['row']}>
            <Groups
              values={groups}
              onChange={(value) => handleChangeGroups(value)}
            />
          </div>
          <div className={styles['row']}>
            <Categories
              values={categories}
              onChange={(value) => handleChangeCategories(value)}
            />
          </div>
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
