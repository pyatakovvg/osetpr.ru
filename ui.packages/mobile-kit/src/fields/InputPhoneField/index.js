
import React from 'react';

import BaseField from "../BaseField";
import Input from '../../simbols/InputPhone';


export default function(props) {
  return (
    <BaseField {...props}>
      <Input />
    </BaseField>
  );
}
