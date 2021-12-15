
import { selectCustomers } from '@modules/admin-order';

import { Row, Col, InputField, SelectField, TextareaField, DatePickerField, DaDataField } from '@ui.packages/admin-kit';

import React  from "react";
import { FieldArray } from 'redux-form';
import { useSelector } from 'react-redux';

import Products from './Products';

import styles from './default.module.scss';


function Form({ handleSubmit }) {
  const customers = useSelector(selectCustomers);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['common']}>
        <Row>
          <Col>
            <SelectField
              require
              name={'userUuid'}
              label={'Клиент'}
              options={customers}
              optionKey={'uuid'}
              optionValue={'login'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name={'title'} label={'Название'} />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField name={'description'} label={'Описание'} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DatePickerField
              useTime
              name={'dateTo'}
              label={'Выполнить до'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DaDataField require name={'address'} label={'Адрес доставки'} />
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
