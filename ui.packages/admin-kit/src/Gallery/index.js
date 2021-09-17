
import types from 'prop-types';
import React, { useState } from 'react';

import Image from '../symbols/Image';

import cn from 'classnames';
import styles from './default.module.scss';


function Gallery({ index, items, path, valueKey, className, isList, size }) {
  const [activeIndex, setActiveIndex] = useState(index);

  function hasCountItems(items) {
    return items.length > 1;
  }

  function handlePrevClick() {
    let prevIndex = activeIndex - 1;
    if (prevIndex < 0) {
      prevIndex = items.length - 1;
    }
    setActiveIndex(prevIndex);
  }

  function handleNextClick() {
    let nextIndex = activeIndex + 1;
    if (nextIndex > items.length - 1) {
      nextIndex = 0;
    }
    setActiveIndex(nextIndex);
  }

  function getFileName() {
    let fileSrc = items[activeIndex];
    if (fileSrc && fileSrc.constructor === Object) {
      fileSrc = fileSrc[valueKey];
    }
    return fileSrc ? `${path}/${fileSrc}?size=${size}` : '';
  }

  const src = getFileName();
  const hasCount = hasCountItems(items);
  const classNameGalleryWrapper = cn(className, styles['wrapper']);
  const classNamePrevItem = cn(styles['icon'], 'fa fa-chevron-left');
  const classNameNextItem = cn(styles['icon'], 'fa fa-chevron-right');

  return (
    <div className={classNameGalleryWrapper}>
      <div className={styles['content']}>
        <Image size="cover" src={src} />

      </div>
      {isList && hasCount && (
        <div className={styles['arrows']}>
          <span className={styles['prev']} onClick={handlePrevClick}>
            <span className={classNamePrevItem} />
          </span>
          <span className={styles['next']} onClick={handleNextClick}>
            <span className={classNameNextItem} />
          </span>
          {hasCount && (
            <div className={styles['count']}>
              <span className={styles['number']}>{activeIndex + 1} из {items.length}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Gallery.propTypes = {
  className: types.string,
  valueKey: types.string,
  path: types.string,
  items: types.array,
  index: types.number,
  isList: types.bool,
  size: types.oneOf(['small', 'middle', 'large']),
};

Gallery.defaultProps = {
  className: '',
  valueKey: null,
  path: '',
  items: [],
  index: 0,
  isList: true,
  size: 'large',
};

export default Gallery;
