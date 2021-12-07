
import React from 'react';

import BaseField from "../BaseField";
import Datepicker from '../../simbols/Datepicker';


export default function(props) {
  return (
    <BaseField {...props}>
      <Datepicker />
    </BaseField>
  );
}
