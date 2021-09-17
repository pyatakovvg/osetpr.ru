
import { selectUnits } from '@modules/order-main';

import { Mode } from '@ui.packages/types';
import { Row, Col, Button, InputField, TextareaField, SelectField } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


const types = [
  { id: 'string', value: 'Текстовый' },
  { id: 'number', value: 'Числовой' },
  { id: 'bool', value: 'Булевый' },
];


export default ({ handleSubmit, valid, pristine }) => {
  const units = useSelector(selectUnits);

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField
              require
              name="value"
              label="Значение"
              maxLength={255}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              require
              name="type"
              label="Тип поля"
              options={types}
              optionKey="id"
              optionValue="value"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField
              name="unitId"
              label="Величина"
              options={units}
              optionKey="id"
              optionValue="value"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextareaField
              name="description"
              label="Описание"
              maxLength={1024}
            />
          </Col>
        </Row>
      </div>
      <div className={styles['controls']}>
        <Button
          type={Button.TYPE_SUBMIT}
          mode={Mode.SUCCESS}
          disabled={ ! valid || pristine}
        >Сохранить</Button>
      </div>
    </form>
  )
};
