
import { objectToQuery, queryToObject } from '@ui.packages/utils';

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Form from './Form';


function Filter() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSubmit(data) {
    navigate(objectToQuery(data));
  }

  return (
    <Form
      initialValues={queryToObject(location['search'])}
      onSubmit={handleSubmit}
    />
  );
}

export default Filter;
