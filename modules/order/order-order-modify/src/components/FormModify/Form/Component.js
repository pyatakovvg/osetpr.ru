
import { Row, Col, InputField, TextareaField, DatePickerField } from '@ui.packages/admin-kit';

import React  from "react";


function Form({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
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
          <DatePickerField require name={'dateTo'} label={'Выполнить до'} />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField require name={'address'} label={'Адрес доставки'} />
        </Col>
      </Row>
    </form>
  );
}

export default Form;
