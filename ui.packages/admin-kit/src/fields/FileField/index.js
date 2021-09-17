
import React from 'react';
import types from 'prop-types';

import BaseField from "../BaseField";
import FileInput from '../../symbols/FileInput';


function FileField({ error, ...props }) {
  return (
    <BaseField { ...props } message={error}>
      <FileInput />
    </BaseField>
  );
}

FileField.propTypes = {
  name: types.string,
  mode: types.string,
  label: types.string,
  type: types.string,
  disabled: types.bool,
};

export default FileField;
