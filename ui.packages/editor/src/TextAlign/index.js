
import React from 'react';

import Block from "../Button";

import styles from './defaults.module.scss';


const LIST_STYLES = [
  { label: 'left', style: 'left', icon: 'fas fa-align-left', },
  { label: 'center', style: 'center', icon: 'fas fa-align-center', },
  { label: 'right', style: 'right', icon: 'fas fa-align-right', },
  { label: 'justify', style: 'justify', icon: 'fas fa-align-justify', },
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
          active={currentState['textAlignment'] === type['style']}
          onToggle={(style) => onChange(style)}
        />
      ))}
    </div>
  );
}

export default Styles;
