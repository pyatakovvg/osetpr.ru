
import { Row, Col, InputField, DaDataField, InputMaskField, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { reset } from 'redux-form';
import { useDispatch } from 'react-redux';

import styles from './default.module.scss';


function Customer({ handleSubmit, valid, pristine }) {
  const dispatch = useDispatch();

  function handleReset() {
    dispatch(reset('common-modify'));
  }

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <InputField
            require
            name="name"
            label="Название организации"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <DaDataField
            require
            name="address"
            label="Адрес организации"
            autocomplite={'off'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputMaskField require mask={'+7 (999) 999-99-99'} name="phone" label="Контактный номер телефона" />
        </Col>
      </Row>
      <div className={styles['controls']}>
        <Button
          mode={Button.MODE_PRIMARY}
          form={Button.FORM_CONTEXT}
          disabled={pristine}
          onClick={() => handleReset()}
        >Сбросить</Button>
        <Button
          type={'submit'}
          mode={Button.MODE_SUCCESS}
          disabled={ ! valid && pristine}
        >Сохранить</Button>
      </div>
    </form>
  );
}

export default Customer;
