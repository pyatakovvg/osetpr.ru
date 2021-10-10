
import { Container, Row, Col, InputField } from '@ui.packages/admin-kit';

import React from 'react';

import styles from './default.module.scss';


export default function Step1() {
  return (
    <Container className={styles['wrapper']}>
      <Row>
        <Col>
          <InputField name="login" label="Логин" />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField name="password" label="Пароль" type="password" />
        </Col>
      </Row>
    </Container>
  );
}
