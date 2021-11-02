
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if ( ! values['name']) {
    errors['name'] = 'Необходимо заполнить';
  }

  if ( ! values['phone']) {
    errors['phone'] = 'Необходимо заполнить';
  }
  else if ( ! /[+7]\d{10}/ig.test(values['phone'])) {
    errors['phone'] = 'Неверный формат';
  }

  return errors;
}

export default reduxForm({
  form: 'order-details',
  validate,
})(Component);
