
import { reduxForm } from 'redux-form';

import Component from './Component';


export default reduxForm({
  form: 'group-modify',
  enableReinitialize: true,
})(Component);
