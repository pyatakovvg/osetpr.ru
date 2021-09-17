
import types from 'prop-types';
import React from 'react';

import BaseField from '../BaseField';
import List from '../../symbols/List';


function ListField({ error, ...props }) {
  return (
    <BaseField {...props} message={error}>
      <List />
    </BaseField>
  );
}

ListField.propTypes = {
  className: types.string,
  name: types.string,
  mode: types.string,
  label: types.string,
  type: types.string,
  disabled: types.bool,
  error: types.string,
};

ListField.defaultProps = {
  className: '',
  name: 'field',
  mode: 'default',
  label: null,
  disabled: false,
  type: 'text',
  error: null,
};

export default ListField;
