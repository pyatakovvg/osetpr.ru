
import { Row, Col, InputField } from '@ui.packages/admin-kit';

import React  from "react";
import { FieldArray } from 'redux-form';

import Products from './Products';

import styles from './default.module.scss';


function Form({ handleSubmit }) {
  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['common']}>
        <Row>
          <Col>
            <InputField
              require
              name={'name'}
              label={'Название'}
            />
          </Col>
          <Col />
        </Row>
      </div>
      <div className={styles['products']}>
        <Row>
          <Col>
            <FieldArray name={'products'} component={Products} />
          </Col>
        </Row>
      </div>
    </form>
  );
}

export default Form;
