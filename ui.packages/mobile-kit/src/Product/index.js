
import React from 'react';

import Default from './Default';


export default function Product({ type, ...props }) {
  switch(type) {
    default: return <Default {...props} />
  }
}
