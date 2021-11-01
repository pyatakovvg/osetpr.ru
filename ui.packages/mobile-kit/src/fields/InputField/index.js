
import React from 'react';

import BaseField from "../BaseField";
import Input from '../../Input';


export default function(props) {
  return (
    <BaseField {...props}>
      <Input />
    </BaseField>
  );
}
