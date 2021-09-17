
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Component from './Component';

import { createTabs, removeTabs, setActiveTab } from '../ducks/commands';


const mapStateToProps = () => {
  return {
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    createTabs: bindActionCreators(createTabs, dispatch),
    removeTabs: bindActionCreators(removeTabs, dispatch),
    setActiveTab: bindActionCreators(setActiveTab, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);
