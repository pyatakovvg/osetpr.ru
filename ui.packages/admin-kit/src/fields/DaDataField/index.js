
import React from 'react';
import types from 'prop-types';

import BaseField from '../BaseField';
import DaData from '../../symbols/DaData';


function DaDataField(props) {
  return (
    <BaseField {...props}>
      <DaData />
    </BaseField>
  );
}

DaDataField.propTypes = {
  type: types.string,
  name: types.string,
  mode: types.string,
  label: types.string,
  disabled: types.bool,
  onChange: types.func,
};

export default DaDataField;
