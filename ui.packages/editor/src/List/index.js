
import React from 'react';

import Block from "../Button";

import styles from './defaults.module.scss';


const LIST_STYLES = [
  { label: 'Unordered', style: 'unordered', icon: 'fas fa-list-ul', },
  { label: 'Ordered', style: 'ordered', icon: 'fas fa-list-ol', },
  { label: 'Indent', style: 'indent', icon: 'fas fa-indent', },
  { label: 'Outdent', style: 'outdent', icon: 'fas fa-outdent', },
];


function Styles({ currentState, onChange }) {
  return (
    <div className={styles['wrapper']}>
      {LIST_STYLES.map((type) => (
        <Block
          key={type['label']}
          icon={type['icon']}
          style={type['style']}
          className={styles[type['style']]}
          active={currentState['listType'] === type['style']}
          onToggle={(style) => onChange(style)}
        />
      ))}
    </div>
  );
}

export default Styles;
