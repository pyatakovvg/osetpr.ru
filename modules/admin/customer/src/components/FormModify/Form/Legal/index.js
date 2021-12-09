
import { Row, Col, InputField, DaDataField, InputMaskField } from '@ui.packages/admin-kit';

import React from "react";

import styles from './default.module.scss';


function Legal() {
  return (
    <div className={styles['wrapper']}>
      <Row>
        <Col>
          <InputField require label={'Название организации'} name={'name'} />
        </Col>
        <Col>
          <InputMaskField require mask={'+7 (999) 999-99-99'} name="phone" label="Контактный телефон" />
        </Col>
      </Row>
      <Row>
        <Col>
          <DaDataField require label={'Адрес организации'} name={'address'} />
        </Col>
      </Row>
    </div>
  );
}

export default Legal;
