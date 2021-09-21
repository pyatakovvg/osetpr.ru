
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if ( ! values['title']) {
    errors['title'] = 'Обязательно к заполнению';
  }

  if ( ! values['description']) {
    errors['description'] = 'Обязательно к заполнению';
  }

  if ( ! values['dateTo']) {
    errors['dateTo'] = 'Обязательный выбор';
  }

  if ( ! values['address']) {
    errors['address'] = 'Обязательно к заполнению';
  }

  return errors;
}


export default reduxForm({
  form: 'order-modify',
  enableReinitialize: true,
  validate,
})(Component);
