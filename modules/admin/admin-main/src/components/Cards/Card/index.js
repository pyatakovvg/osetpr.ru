
import { Link } from '@ui.packages/admin-kit';

import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Card({ icon, title, href }) {
  return (
    <Link className={styles['wrapper']} href={href}>
      <div className={styles['thumb']}>
        <span className={cn(styles['icon'], icon)} />
      </div>
      <div className={styles['title']}>
        <p className={styles['text']}>{ title }</p>
      </div>
    </Link>
  );
}

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
