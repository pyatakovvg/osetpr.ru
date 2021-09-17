
import types from 'prop-types';
import ReactDOM from 'react-dom';
import React, { forwardRef } from 'react';

import Option from "./Option";

import styles from './default.module.scss';


function useChangeElement() {
  let portalElement = document.querySelector('#suggestionsPortal');
  if ( ! portalElement) {
    portalElement = document.createElement('div');
    portalElement.setAttribute('id', 'suggestionsPortal');
    document.body.appendChild(portalElement);
  }
  return portalElement;
}


const Suggestions = forwardRef(({ items, onSelect }, ref) => {
  const portalElement = useChangeElement();

  function handleSelect(value) {
    onSelect(value);
  }

  return ReactDOM.createPortal(
    <div ref={ref} className={styles['wrapper']}>
      <div className={styles['container']}>
        {items.map((item, index) => (
          <Option key={index} value={item['value']} onClick={() => handleSelect(item['value'])} />
        ))}
      </div>
    </div>
  , portalElement);
});

Suggestions.propTypes = {
  items: types.array,
};

Suggestions.defaultProps = {
  items: [],
};

export default Suggestions;
