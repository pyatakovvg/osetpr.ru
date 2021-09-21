
import { reduxForm } from 'redux-form';

import Component from './Component';


export default reduxForm({
  form: 'order-modify',
  enableReinitialize: true,
})(Component);
