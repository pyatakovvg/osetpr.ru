
import { reduxForm } from 'redux-form';

import Component from "./Component";


function validate(values) {
  const errors = {};

  if (values['gallery']) {
    if ( ! values['gallery'].length) {
      errors['gallery'] = 'Необходимо выбрать';
    }
  }

  return errors;
}

export default reduxForm({
  form: 'gallery',
  enableReinitialize: true,
  validate,
})(Component);
