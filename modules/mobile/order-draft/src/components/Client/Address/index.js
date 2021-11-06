
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if ( ! values['city']) {
    errors['city'] = 'Необходимо заполнить';
  }

  if ( ! values['street']) {
    errors['street'] = 'Необходимо заполнить';
  }

  if ( ! values['house']) {
    errors['house'] = 'Необходимо заполнить';
  }

  return errors;
}

export default reduxForm({
  form: 'order-address',
  validate,
})(Component);
