
import React from 'react';
import types from 'prop-types';

import Row from '../Row';
import Header from '../Header';
import Column from '../Column';

import styles from './default.module.scss';


function Table({ useSub, subTemplate, columns, children }) {
  return (
    <div className={styles['wrapper']}>
      <table className={styles['table']}>
        <Header>{ children }</Header>
        { ! columns.length && (
          <caption className={styles['empty']}>
            <span className={styles['message']}>Нет данных для отображения</span>
          </caption>
        )}
        {columns.map((item, index) => (
          <Row key={index} data={item} useSub={useSub} subTemplate={subTemplate}>
            { children }
          </Row>
        ))}
      </table>
    </div>
  );
}

Table.propTypes = {
  useSub: types.bool,
  subTemplate: types.func,
  columns: types.array,
  children: types.any,
};

Table.defaultProps = {
  useSub: false,
  subTemplate: null,
  columns: [],
  children: Column,
};

export default Table;
