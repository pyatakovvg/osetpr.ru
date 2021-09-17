
import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import styles from './default.module.scss';


function Header({ children }) {

  function renderItem() {
    return React.Children.map(children, (Item, index) => {
      const params = Item['props'];
      const { title, width, align } = params;
      const columnProps = {};

      const isFirst = (index === 0);
      const isLast = (index === React.Children.count(children) - 1);

      if (width) {
        columnProps['width'] = Number(width) + ((isFirst || isLast) ? 25 : 30);
      }

      const titleClassName = cn(styles['title'], {
        [styles['title--left']]: align === 'left',
        [styles['title--right']]: align === 'right',
      });

      return (
        <td className={styles['col']} {...columnProps}>
          {title && (
            <span className={titleClassName}>
              { title }
            </span>
          )}
        </td>
      );
    });
  }

  return (
    <thead className={styles['header']}>
      <tr className={styles['row']}>
        { renderItem() }
      </tr>
    </thead>
  );
}

Header.propTypes = {
  children: PropTypes.any,
  params: PropTypes.object,
};


export default Header;
