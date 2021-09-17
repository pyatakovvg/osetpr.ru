
import React from 'react';
import types from 'prop-types';
import { Field } from 'redux-form';

import Avatar from '../../symbols/Avatar';


const InputField = ({ input, label, mode, ...props }) => {
  return (
    <Avatar {...input} {...props} />
  );
};

function AvatarField({ name, label, ...props }) {
  return (
    <Field name={name} label={label} {...props} component={InputField} />
  );
}

AvatarField.propTypes = {
  name: types.string,
  mode: types.string,
  label: types.string,
  disabled: types.bool,
};

export default AvatarField;
