
import { Button, Text } from "@ui.packages/client-kit";
import { openDialog } from "@ui.packages/client-dialog";

import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './default.module.scss';


function Controls() {
  const dispatch = useDispatch();

  function handleOpenDialog() {
    dispatch(openDialog('create-comment'));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <Text>Если у вас есть предложения или замечания, а так же благодарность, поделитесь ими с нами</Text>
      </div>
      <div className={styles['control']}>
        <Button onClick={handleOpenDialog}>Оставить коментарий</Button>
      </div>
    </div>
  );
}

export default Controls;
