
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if ( ! values['user']) {
    errors['user'] = 'Необходимо заполнить';
  }

  if ( ! values['content']) {
    errors['content'] = 'Необходимо заполнить';
  }

  return errors;
}


export default reduxForm({
  form: 'order-description',
  validate,
})(Component);
