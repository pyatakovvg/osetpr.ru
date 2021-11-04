
import React from 'react';

import Several from './Several';


export default function HOC(props) {

  if (props['modes'].length > 1) {
    return <Several {...props} />
  }

  return <Several {...props} />;
}
