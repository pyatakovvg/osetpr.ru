
import { Container, Row, Col, InputField } from '@ui.packages/admin-kit';

import React from 'react';


export default function Step1() {
  return (
    <Container>
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
