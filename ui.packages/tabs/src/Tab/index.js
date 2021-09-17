
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Component from './Component';

import { setActiveTab } from '../ducks/commands';


const mapStateToProps = (state) => {
  return {
    tabs: state['tabs'],
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    setActiveTab: bindActionCreators(setActiveTab, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);