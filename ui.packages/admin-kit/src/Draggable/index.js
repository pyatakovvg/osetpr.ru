
import React from 'react';

import List from './List';
import Grid from './Grid';


function FactoryDraggable({ type, children, ...props }) {
  switch(type) {
    case FactoryDraggable.TYPE_LIST: return <List {...props}>{ children }</List>;
    case FactoryDraggable.TYPE_GRID: return <Grid {...props}>{ children }</Grid>;
    default: return <List {...props}>{ children }</List>;
  }
}

FactoryDraggable.TYPE_LIST = 'list';
FactoryDraggable.TYPE_GRID = 'grid';

export default FactoryDraggable;
