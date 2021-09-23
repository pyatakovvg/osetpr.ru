
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};

  if ( ! values['name']) {
    errors['name'] = 'Необходимо заполнить';
  }

  return errors;
};

const mapStateToProps = (state, props) => {
  return {
    initialValues: props['data'],
  }
};

export default connect(mapStateToProps)(reduxForm({
  form: 'image-modify',
  validate,
  enableReinitialize: true,
})(Component));
