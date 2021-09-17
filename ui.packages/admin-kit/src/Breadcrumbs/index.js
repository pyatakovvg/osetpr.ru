
import types from 'prop-types';
import { NavLink } from "react-router-dom";
import React, { Fragment } from 'react';

import styles from './default.module.scss';


function Breadcrumbs({ items }) {

  const count = items.length - 1;

  return (
    <div className={styles['breadcrumbs']}>
      {items.map((item, index) => {
        return (
          <Fragment key={index}>
            <span key={`item.${index}`} className={styles['breadcrumbs__item']}>
              {item['href']
                ? <NavLink className={styles['breadcrumbs__link']} to={item['href']}>{ item['title'] }</NavLink>
                : <span className={styles['breadcrumbs__title']}>{ item['title'] }</span>
              }
            </span>
            {(index < count) && (
              <span key={`delimiter.${index}`} className={styles['breadcrumbs__item']}>
                <span className={styles['breadcrumbs__delimiter']}>{'/'}</span>
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

Breadcrumbs.propTypes = {
  items: types.array,
};

Breadcrumbs.defaultProps = {
  items: [],
};

export default Breadcrumbs;
