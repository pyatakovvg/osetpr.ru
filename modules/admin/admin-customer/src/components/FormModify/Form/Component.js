
import { Row, Col } from '@ui.packages/admin-kit';

import React  from "react";
import { useSelector } from 'react-redux';
import { FieldArray, getFormValues } from 'redux-form';

import Plans from './Plans';
import Legal from './Legal';
import Individual from './Individual';

import styles from './default.module.scss';


function Form({ handleSubmit }) {
  const values = useSelector(getFormValues('customer-modify'));

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['common']}>
        {(values['type'] === 'legal') && (
          <Legal />
        )}
        {(values['type'] === 'individual') && (
          <Individual />
        )}
      </div>
      <div className={styles['plans']}>
        <Row>
          <Col>
            <FieldArray name={'plans'} component={Plans} />
          </Col>
        </Row>
      </div>
    </form>
  );
}

export default Form;
