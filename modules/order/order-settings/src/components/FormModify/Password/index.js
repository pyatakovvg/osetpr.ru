
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate() {
  const errors = {};

  return errors;
}


export default reduxForm({
  form: 'password-modify',
  enableReinitialize: true,
  validate,
})(Component);
