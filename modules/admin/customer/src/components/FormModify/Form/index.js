
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if (values['type'] === 'legal') {

    if ( ! values['name']) {
      errors['name'] = 'Обязательно к заполнению';
    }

    if ( ! values['address']) {
      errors['address'] = 'Обязательно к заполнению';
    }

    if ( ! values['phone']) {
      errors['phone'] = 'Обязательно к заполнению';
    }
  }

  const planErrors = [];
  if (values['plans']) {
    values['plans'].forEach((plan, index) => {
      const planError = {};

      if ( ! plan['planUuid']) {
        planError['planUuid'] = 'Неоходимо заполнить';
        planErrors[index] = planError;
      }
    });
  }

  if ( !! planErrors.length) {
    errors['plans'] = planErrors;
  }

  return errors;
}


export default reduxForm({
  form: 'customer-modify',
  enableReinitialize: true,
  validate,
})(Component);
