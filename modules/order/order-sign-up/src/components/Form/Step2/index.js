
import { Container, Row, Col, InputField } from '@ui.packages/admin-kit';

import React from 'react';


export default function Step2() {
  return (
    <Container>
      <Row>
        <Col>
          <InputField require name="customer.name" label="Название организации" />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField require name="customer.address" label="Адрес организации" />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField require name="customer.phone" label="Контактный телефон" />
        </Col>
      </Row>
    </Container>
  );
}
