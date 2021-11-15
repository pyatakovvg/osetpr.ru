
import React from 'react';

import BaseField from "../BaseField";
import Textarea from '../../simbols/Textarea';


export default function(props) {
  return (
    <BaseField {...props}>
      <Textarea />
    </BaseField>
  );
}
