
import { Row, Col, InputField, TextareaField, DatePickerField } from '@ui.packages/admin-kit';

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
            <InputField require name={'title'} label={'Название'} />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField require name={'description'} label={'Описание'} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DatePickerField
              require
              useTime
              name={'dateTo'}
              label={'Выполнить до'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField require name={'address'} label={'Адрес доставки'} />
          </Col>
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
