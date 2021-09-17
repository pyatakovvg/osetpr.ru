
import React from 'react';
import types from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import Back from './Back';
import Forward from './Forward';
import Page from './Page';

import styles from './default.module.scss';


export default function Paging({ total, skip, disabled, onChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location['search']);
  const page = Number(query.get('page')) || 1;
  const pages = Number(Math.ceil(total / skip).toFixed(0));

  function handleClick(number) {
    query.delete('page');
    query.append('page', number);

    navigate('?' + query.toString());

    onChange && onChange(number);
  }

  function handlePrevClick() {
    const newPage = page - 1;
    if (newPage >= 1) {
      handleClick(newPage);
    }
  }

  function handleNextClick() {
    const newPage = page + 1;
    if (newPage <= pages) {
      handleClick(newPage);
    }
  }

  if (pages <= 1) {
    return null;
  }

  return (
    <div className={styles['wrapper']}>
      {(page !== 1) && (
        <div className={styles['controls']}>
          <Back type="prev" disabled={disabled} onClick={() => handleClick(1)} />
          <Forward type="prev" disabled={disabled} onClick={() => handlePrevClick()} />
        </div>
      )}
      <div className={styles['numbers']}>
        {Array(pages).fill(1).map((number, index) => (
          <Page
            key={index}
            isActive={page === (index + 1)}
            disabled={disabled}
            onClick={() => handleClick(index + 1)}
          >{ index + 1 }</Page>
        ))}
      </div>
      {(page !== pages) && (
        <div className={styles['controls']}>
          <Forward type="next" disabled={disabled} onClick={() => handleNextClick()} />
          <Back type="next" disabled={disabled} onClick={() => handleClick(pages)} />
        </div>
      )}
    </div>
  );
}

Paging.propTypes = {
  total: types.number,
  skip: types.number,
  disabled: types.bool,
  onChange: types.func,
};

Paging.defaultProps = {
  total: 1,
  skip: 1,
  disabled: false,
  onChange: null,
};
