
import React from 'react';

import BaseField from "../BaseField";
import Checkbox from '../../simbols/Checkbox';


export default function(props) {
  return (
    <BaseField {...props}>
      <Checkbox />
    </BaseField>
  );
}
