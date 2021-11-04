
import React from 'react';

import Single from './Single';
import Several from './Several';


export default function HOC(props) {

  if (props['modes'].length > 1) {
    return <Several {...props} />
  }

  return <Single {...props} />;
}
