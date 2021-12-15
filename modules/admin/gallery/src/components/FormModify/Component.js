
import { Mode } from '@ui.packages/types';
import { Row, Col, Button, InputField } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


export default ({ handleSubmit, valid, pristine }) => {
  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              name="name"
              label="Название"
              maxLength={255}
            />
          </Col>
        </Row>
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_SUBMIT}
          mode={Mode.SUCCESS}
          disabled={ ! valid || pristine}
        >Выполнить</Button>
      </div>
    </form>
  )
};
