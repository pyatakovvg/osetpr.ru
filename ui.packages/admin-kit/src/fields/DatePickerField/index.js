
import React from 'react';
import types from 'prop-types';

import BaseField from '../BaseField';
import DatePicker from '../../symbols/DatePicker';


function DatePickerField(props) {
  return (
    <BaseField {...props}>
      <DatePicker />
    </BaseField>
  );
}

DatePickerField.propTypes = {
  name: types.string,
  mode: types.string,
  label: types.string,
  disabled: types.bool,
};

export default DatePickerField;
