
import { Header, Link } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


function Card({ title }) {
  return (
    <Link className={styles['wrapper']} href={'/orders'}>
      <Header>{ title }</Header>
    </Link>
  );
}

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
