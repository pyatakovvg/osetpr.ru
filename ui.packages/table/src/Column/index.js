
import types from 'prop-types';
import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


function Column({ align, alias, empty, transform, _model, children }) {
  function renderData() {
    let model = (alias ? _model[alias] : _model) || empty;

    if (model && (transform instanceof Function)) {
      model = transform(model);
    }

    if (model || model === null) {
      if (children instanceof Function) {
        return children(model) || empty;
      }
      else {
        if (model !== null && (model instanceof Object)) {
          if (children) {
            return React.cloneElement(children, model);
          }
        }
        else {
          if (children) {
            return React.cloneElement(children, { value: model });
          }
        }
      }
    }

    return null;
  }

  const contentClassName = cn(styles['content'], {
    [styles['content--left']]: align === 'left',
    [styles['content--right']]: align === 'right',
  });

  const child = useMemo(() => renderData(), [_model]);

  return (
    <td className={styles['col']}>
      <span className={contentClassName}>
        { child }
      </span>
    </td>
  );
}

Column.propTypes = {
  alias: types.string,
  title: types.string,
  width: types.string,
  align: types.oneOf(['left', 'center', 'right']),
  empty: types.any,
  children: types.any,
  _model: types.object,
  transform: types.func,
};

Column.defaultProps = {
  alias: null,
  title: null,
  empty: null,
  width: null,
  align: 'center',
  children: null,
  _model: null,
  transform: null,
};

export default Column;
