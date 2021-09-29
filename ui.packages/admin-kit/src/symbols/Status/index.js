
import React from "react";
import types from 'prop-types';

import Text from './Text';
import Label from './Label';
import Dotted from './Dotted';


function StatusFactory({ type, children, ...props }) {
  switch(type) {
    case StatusFactory.TYPE_LABEL: return <Label {...props} />;
    case StatusFactory.TYPE_TEXT: return <Text {...props}>{ children }</Text>;
    case StatusFactory.TYPE_DOTTED: return <Dotted {...props}>{ children }</Dotted>;
  }
}

StatusFactory.TYPE_TEXT = 'text';
StatusFactory.TYPE_LABEL = 'label';
StatusFactory.TYPE_DOTTED = 'dotted';

StatusFactory.propTypes = {
  type: types.oneOf([StatusFactory.TYPE_LABEL, StatusFactory.TYPE_DOTTED, StatusFactory.TYPE_TEXT]),
  children: types.any,
};

StatusFactory.defaultProps = {
  type: StatusFactory.TYPE_DOTTED,
  children: null,
};

export default StatusFactory;
