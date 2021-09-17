
import React from 'react';
import types from 'prop-types';
import { Fields } from 'redux-form';

import Input from './Input';


function Suggest({ name, label }) {
  return (
    <Fields names={[
      `${name}.postalCode`,
      `${name}.country`,
      `${name}.province`,
      `${name}.locality`,
      `${name}.street`,
      `${name}.house`,
      `${name}.entrance`,
      `${name}.floor`,
      `${name}.flat`,
    ]} name={name} label={label} component={Input} />
  );
}

Suggest.propTypes = {
  name: types.string,
  label: types.string,
};

Suggest.defaultProps = {
  name: 'address',
  label: '',
};

export default Suggest;
