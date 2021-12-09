
import validator from 'validator';
import { reduxForm } from 'redux-form';

import Form from './Component';


const validate = values => {
  let error = {};
  if ( ! values['login']) {
    error['login'] = 'Заполните поле';
  } else if ( ! validator.isEmail(values['login'])) {
    error['login'] = 'Неверный формат';
  }
  if ( ! values['password']) {
    error['password'] = 'Заполните поле';
  }
  return error;
};


export default reduxForm({
  form: 'sign-in',
  validate,
})(Form);
