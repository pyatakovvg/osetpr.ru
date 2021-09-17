
import React from 'react';
import { Link } from "react-router-dom";

import styles from './default.module.scss';


export default function Logotype() {
  return (
    <div className={styles['wrapper']}>
      <Link className={styles['logotype']} to={'/'}><i className="fas fa-circle-notch" />&nbsp;&nbsp;{process.env['REACT_APP_WEBSITE_NAME']}</Link>
    </div>
  )
}
