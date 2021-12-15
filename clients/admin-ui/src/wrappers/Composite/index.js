
import { Context } from '@ui.packages/admin-application';

import types from "prop-types";
import React, { useContext } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import Wrapper from '../Navigate';
import Navigation from './Navigation';

import styles from './default.module.scss';


const useCompositeNavigate = (navigate) => {
  const location = useLocation();

  return navigate.find((item) => {
    let hasPath = false;
    let mainPath = location['pathname'];

    if ('navigate' in item) {
      hasPath = item['navigate'].some((item) => {
        const match = matchPath(item['path'], mainPath);
        return match ? match : false;
      });
    }

    return hasPath;
  });
}

export default function Composite({ children }) {
  const { navigate } = useContext(Context);
  const newNavigate = useCompositeNavigate(navigate);

  return (
    <Wrapper className={styles['wrapper']} navigate={navigate}>
      <section className={styles['page']}>
        <aside className={styles['aside']}>
          <Navigation items={newNavigate['navigate']} />
        </aside>
        <article className={styles['content']}>
          { children }
        </article>
      </section>
    </Wrapper>
  );
}

Composite.propTypes = {
  children: types.node,
};
