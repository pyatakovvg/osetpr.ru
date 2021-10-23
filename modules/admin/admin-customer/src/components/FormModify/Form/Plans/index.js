
import { Header, Button, Text } from '@ui.packages/admin-kit';

import React  from "react";

import Plan from './Plan';

import styles from './default.module.scss';


function Plans({ fields }) {
  function handleAdd() {
    fields.push({
      isNew: true,
    });
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={3}>История планов</Header>
      </div>
      <div className={styles['content']}>
        { ! fields.length && <Text>Нет привязанных планов</Text>}
        {fields.map((field, index) => {
          const plan = fields.get(index);
          return (
            <div key={index} className={styles['product']}>
              <div className={styles['product__content']}>
                <Plan field={field} {...plan} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles['controls']}>
        <Button
          mode={Button.MODE_PRIMARY}
          onClick={() => handleAdd()}
        >Добавить</Button>
      </div>
    </div>
  );
}

export default Plans;
