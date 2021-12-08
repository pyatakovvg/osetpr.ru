
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {
    address: {},
    customer: {},
  };

  if (values['address']) {
    if ( ! values['address']['city']) {
      errors['address']['city'] = 'Необходимо заполнить';
    }

    if ( ! values['address']['street']) {
      errors['address']['street'] = 'Необходимо заполнить';
    }

    if ( ! values['address']['house']) {
      errors['address']['house'] = 'Необходимо заполнить';
    }
  }

  if (values['customer']) {
    if ( ! values['customer']['name']) {
      errors['customer']['name'] = 'Необходимо заполнить';
    }

    if ( ! values['customer']['phone']) {
      errors['customer']['phone'] = 'Необходимо заполнить';
    }
    else if ( ! /[+7]\d{10}/ig.test(values['customer']['phone'])) {
      errors['customer']['phone'] = 'Неверный формат';
    }
  }


  return errors;
}

export default reduxForm({
  form: 'order-modify',
  validate,
})(Component);
