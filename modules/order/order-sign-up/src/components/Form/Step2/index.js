
import { Container, Row, Col, InputField, DaDataField, InputMaskField } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


export default function Step2() {
  return (
    <Container className={styles['wrapper']}>
      <Row>
        <Col>
          <InputField require name="customer.name" label="Название организации" />
        </Col>
      </Row>
      <Row>
        <Col>
          <DaDataField
            require
            name="customer.address"
            label="Адрес организации"
            autocomplite={'off'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputMaskField require mask={'+7 (999) 999-99-99'} name="customer.phone" label="Контактный телефон" />
        </Col>
      </Row>
    </Container>
  );
}
