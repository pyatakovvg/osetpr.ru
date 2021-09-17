
import { bindActionCreators } from 'redux';
import { change, blur } from 'redux-form';
import { connect } from 'react-redux';

import Component from './Component';


const mapActionToProps = (dispatch) => {
  return {
    blur: bindActionCreators(blur, dispatch),
    change: bindActionCreators(change, dispatch),
  };
};

export default connect(
  null,
  mapActionToProps,
)(Component);
