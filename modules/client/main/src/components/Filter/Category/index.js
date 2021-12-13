
import { selectFilter } from '@modules/client-main';

import { queryToObject } from "@ui.packages/utils";
import { Header, Text, Checkbox } from '@ui.packages/client-kit';

import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import React, { useState, useMemo, useEffect } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function useQuery(name) {
  const location = useLocation();
  const [hasItems, setHasItems] = useState(false);
  useEffect(() => {
    const query = queryToObject(location['search']);
    setHasItems(name in query);
  }, [location['search']]);
  return hasItems;
}

function Groups({ values, onChange }) {
  const [isOpen, setOpen] = useState(true);

  const filter = useSelector(selectFilter);
  const hasSelected = useQuery('categoryUuid');

  const wrapperClassName = useMemo(() => cn(styles['wrapper'], {
    [styles['is-has']]: hasSelected,
  }), [hasSelected]);
  const iconClassName = useMemo(() => cn(styles['icon'], {
    ['fas fa-minus']: isOpen,
    ['fas fa-plus']: ! isOpen,
  }), [isOpen]);

  function handleCollapse() {
    setOpen( ! isOpen);
  }

  function handleChange(value) {
    let newValues;
    if (!!~ values.indexOf(value)) {
      newValues = values.filter((id) => id !== value);
    }
    else {
      newValues = [value, ...values];
    }
    onChange && onChange(newValues);
  }

  return (
    <div className={wrapperClassName}>
      <div className={styles['header']} onClick={handleCollapse}>
        <Header level={3} className={styles['title']}>Категория</Header>
        <span className={iconClassName} />
      </div>
      {isOpen && (
        <div className={styles['content']}>
          {(filter['categories'] || []).map((item) => (
            <div key={item['uuid']} className={styles['checkbox']}>
              <Checkbox value={ !!~ values.indexOf(item['uuid'])} onChange={() => handleChange(item['uuid'])}>
                <Text>{ item['value'] }</Text>
              </Checkbox>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Groups;
