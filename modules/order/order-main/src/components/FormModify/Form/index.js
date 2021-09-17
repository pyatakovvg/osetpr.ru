
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};

  if ( ! values['value']) {
    errors['value'] = 'Необходимо заполнить';
  }

  if ( ! values['type']) {
    errors['type'] = 'Необходимо выбрать';
  }

  return errors;
};


export default reduxForm({
  form: 'attr-modify',
  validate,
  enableReinitialize: true,
})(Component);
