
import { Row, Col, InputField, TextareaField, DatePickerField } from '@ui.packages/admin-kit';

import React  from "react";


function Form({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
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
          <DatePickerField name={'dateTo'} label={'Выполнить до:'} />
        </Col>
      </Row>
    </form>
  );
}

export default Form;
