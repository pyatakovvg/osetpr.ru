
import React from 'react';

import Block from "../Button";

import styles from './defaults.module.scss';


const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one', icon: 'fas fa-heading', },
  { label: 'H2', style: 'header-two', icon: 'fas fa-heading', },
  { label: 'H3', style: 'header-three', icon: 'fas fa-heading', },
  { label: 'Blockquote', style: 'blockquote', icon: 'fas fa-quote-right', },
];

function BlockStyleControls({ currentState, onChange }) {
  return (
    <div className={styles['wrapper']}>
      {BLOCK_TYPES.map((type) => (
        <Block
          key={type['label']}
          icon={type['icon']}
          style={type['label']}
          className={styles[type['style']]}
          active={type['label'] === currentState['blockType']}
          onToggle={(style) => onChange(style)}
        />
      ))}
    </div>
  );
}

export default BlockStyleControls;
