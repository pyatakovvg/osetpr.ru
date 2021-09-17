
import React from 'react';
import types from 'prop-types';

import BaseField from '../BaseField';
import Textarea from '../../symbols/Textarea';


function TextareaField(props) {
  return (
    <BaseField {...props}>
      <Textarea />
    </BaseField>
  );
}

TextareaField.propTypes = {
  name: types.string,
  mode: types.string,
  label: types.string,
  disabled: types.bool,
};

export default TextareaField;
