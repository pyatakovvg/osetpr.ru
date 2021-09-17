
import React from 'react';
import types from 'prop-types';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import cn from 'classnames';
import styles from './default.module.scss';


const Handle = SortableHandle(function() {
  return (
    <div className={styles['handle']}>
      <span className={cn(styles['icon'], "fas fa-grip-vertical")} />
    </div>
  );
});

const SortableItem = SortableElement(function({ value }) {
  return (
    <div className={styles['wrapper']}>
      <Handle />
      <div className={styles['content']}>
        {React.cloneElement(value)}
      </div>
    </div>
  );
});

const SortableList = SortableContainer(function({ items }) {
  return (
    <div className={styles['container']}>
      {items.map((child, index) => {
        return (
          <SortableItem key={`item-${index}`} index={index} value={child} />
        );
      })}
    </div>
  );
});

function Draggable({ children, onChange }) {

  function handleSortEnd({ oldIndex, newIndex }) {
    onChange(oldIndex, newIndex);
  }

  return <SortableList
    helperClass={styles['helper']}
    axis="xy"
    items={React.Children.toArray(children)}
    useDragHandle
    onSortEnd={handleSortEnd}
  />;
}

Draggable.propTypes = {
  disabled: types.bool,
  onEdit: types.func,
  onCopy: types.func,
  onDelete: types.func,
};

Draggable.defaultProps = {
  disabled: false,
  onEdit: null,
  onCopy: null,
  onDelete: null,
};

export default Draggable;
