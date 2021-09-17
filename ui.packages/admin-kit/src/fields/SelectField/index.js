
import React from 'react';
import types from 'prop-types';

import BaseField from '../BaseField';
import Select from '../../symbols/Select';


function SelectField(props) {
  return (
    <BaseField {...props}>
      <Select />
    </BaseField>
  );
}

SelectField.TYPE_DEFAULT = Select.TYPE_DEFAULT;
SelectField.TYPE_MULTISELECT = Select.TYPE_MULTISELECT;

SelectField.propTypes = {
  type: types.string,
  name: types.string,
  mode: types.string,
  label: types.string,
  options: types.array,
  disabled: types.bool,
  simple: types.bool,
  defaultKey: types.any,
  optionKey: types.string,
  optionValue: types.string,
  optionTransform: types.func,
  onChange: types.func,
};

export default SelectField;
