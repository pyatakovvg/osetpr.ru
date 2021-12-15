
import { reduxForm } from 'redux-form';

import Component from './Component';


function validate(values) {
  const errors = {};

  if ('bulk' in values) {
    const bulkArrayErrors = [];
    values['bulk'].forEach((item, index) => {
      const itemErrors = {};
      if ( ! item['code']) {
        itemErrors['code'] = 'Необходимо заполнить'
        bulkArrayErrors[index] = itemErrors;
      }
      if ( ! item['displayName']) {
        itemErrors['displayName'] = 'Необходимо заполнить'
        bulkArrayErrors[index] = itemErrors;
      }
    });

    if (bulkArrayErrors.length) {
      errors['bulk'] = bulkArrayErrors;
    }
  }
  return errors;
}


export default reduxForm({
  form: 'payments-modify',
  enableReinitialize: true,
  validate,
})(Component);
