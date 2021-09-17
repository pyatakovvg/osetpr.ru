
import { connect } from 'react-redux';

import Component from './Component';


const mapStateToProps = (state) => {
  return {
    tabs: state['tabs'],
  }
};

const mapActionsToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Component);