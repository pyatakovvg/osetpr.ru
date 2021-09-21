
import validator from 'validator';
import { reduxForm } from 'redux-form';

import Form from './Component';


const validate = values => {
  let error = {};

  if ( ! error['customer']) {
    error['customer'] = {};
  }

  if ( ! values['login']) {
    error['login'] = 'Заполните поле';
  }
  else if ( ! validator.isEmail(values['login'])) {
    error['login'] = 'Неверный формат';
  }

  if ( ! values['password']) {
    error['password'] = 'Заполните поле';
  }

  if ( ! values['customer']) {
    values['customer'] = {};
  }

  if ( ! values['customer']['name']) {
    error['customer']['name'] = 'Заполните поле';
  }

  if ( ! values['customer']['address']) {
    error['customer']['address'] = 'Заполните поле';
  }

  if ( ! values['customer']['phone']) {
    error['customer']['phone'] = 'Заполните поле';
  }

  return error;
};


export default reduxForm({
  form: 'sign-in',
  validate,
})(Form);
