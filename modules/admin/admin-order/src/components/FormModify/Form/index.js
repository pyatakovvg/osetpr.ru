
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if ( ! values['userUuid']) {
    errors['userUuid'] = 'Обязательный выбор';
  }

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

  if ( ! values['products'] || ! values['products'].length) {
    errors['products'] = 'Необходимо выбрать товар';
  }

  const productErrors = [];
  if (values['products']) {
    values['products'].forEach((product, index) => {
      const productError = {};

      if ( ! product['number']) {
        productError['number'] = 'Неоходимо заполнить';
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
  form: 'order-modify',
  enableReinitialize: true,
  validate,
})(Component);
