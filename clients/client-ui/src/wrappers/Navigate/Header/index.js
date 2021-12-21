
import React, { useRef, useState, useEffect } from 'react';

import Content from './Content';
import Description from './Description';
import Controls from './Controls';

import styles from './default.module.scss';


function useOutScreen(ref) {
  const [isOut, setOut] = useState(false);
  useEffect(() => {
    const cartElement = ref['current'];
    function handleScroll() {
      const rect = cartElement.getBoundingClientRect();
      if (rect['bottom'] < 0) {
        setOut(true);
      }
      else {
        setOut(false);
      }
    }
    document.querySelector('#scroller').addEventListener('scroll', handleScroll);
    return () => {
      document.querySelector('#scroller').removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, []);
  return isOut;
}


export default function Header() {
  const headerRef = useRef(null);
  const isOut = useOutScreen(headerRef);

  return (
    <div ref={headerRef} className={styles['wrapper']} role={'banner'}>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <div className={styles['col']}>
            <Content />
          </div>
          <div className={styles['col']}>
            <Description />
          </div>
        </div>
        <div className={styles['controls']}>
          <Controls isOut={isOut} />
        </div>
      </div>
    </div>
  );
}
