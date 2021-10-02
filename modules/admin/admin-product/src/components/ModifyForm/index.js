
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  let errors = {};

  if ( ! values['externalId']) {
    errors['externalId'] = 'Неоходимо сгенерировать';
  }

  if ( ! values['categoryId']) {
    errors['categoryId'] = 'Неоходимо сделать выбор';
  }

  if ( ! values['title']) {
    errors['title'] = 'Неоходимо заполнить';
  }

  if ( ! values['description']) {
    errors['description'] = 'Неоходимо заполнить';
  }

  const modeErrors = [];
  if (values['modes']) {
    values['modes'].forEach((option, index) => {
      const modeError = {};

      if ( ! option['vendor']) {
        modeError['vendor'] = 'Неоходимо заполнить';
        modeErrors[index] = modeError;
      }

      if ( ! option['value']) {
        modeError['value'] = 'Неоходимо заполнить';
        modeErrors[index] = modeError;
      }

      if ( ! option['price']) {
        modeError['price'] = 'Неоходимо заполнить';
        modeErrors[index] = modeError;
      }
      else if ( ! /^[-]?\d+(.\d{1,2})?$/.test(option['price'])) {
        modeError['price'] = 'Неверный формат';
        modeErrors[index] = modeError;
      }
      else if (Number(option['price']) <= 0) {
        modeError['price'] = 'Неверное значение';
        modeErrors[index] = modeError;
      }

      if ( ! option['currencyCode']) {
        modeError['currencyCode'] = 'Неоходимо сделать выбор';
        modeErrors[index] = modeError;
      }
    });
  }
  else {
    errors['modes'] = 'Необходимо добавить модификацию';
  }

  if ( !! modeErrors.length) {
    errors['modes'] = modeErrors;
  }

  return errors;
};


export default reduxForm({
  form: 'product-modify',
  enableReinitialize: true,
  validate,
})(Component);
