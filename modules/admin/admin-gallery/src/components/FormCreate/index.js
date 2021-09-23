
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};

  if ( ! values['value']) {
    errors['value'] = 'Необходимо заполнить';
  }

  return errors;
};

const mapStateToProps = (state, props) => {
  return {
    initialValues: props['data'],
  }
};

export default connect(mapStateToProps)(reduxForm({
  form: 'gallery-create',
  validate,
  enableReinitialize: true,
})(Component));
