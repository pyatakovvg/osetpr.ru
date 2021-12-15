
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if ( ! values['name']) {
    errors['name'] = 'Обязательно к заполнению';
  }

  const productErrors = [];
  if (values['products']) {
    values['products'].forEach((product, index) => {
      const productError = {};

      if ( ! product['percent']) {
        productError['percent'] = 'Неоходимо заполнить';
        productErrors[index] = productError;
      }
    });
  }

  if ( !! productErrors.length) {
    errors['products'] = productErrors;
  }

  return errors;
}


export default reduxForm({
  form: 'plan-modify',
  enableReinitialize: true,
  validate,
})(Component);
