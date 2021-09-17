
import React from 'react';
import types from 'prop-types';

import BaseField from '../BaseField';
import Range from '../../symbols/Range';


function RangeField(props) {
  return (
    <BaseField {...props}>
      <Range />
    </BaseField>
  );
}

RangeField.propTypes = {
  onChange: types.func,
};

export default RangeField;
