
import { queryToObject, objectToQuery } from "@ui.packages/utils";

import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import Groups from "./Groups";
import Category from "./Category";

import styles from './default.module.scss';


function Filter() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = queryToObject(location['search']);
  const groupQuery = query['groupUuid']
    ? (query['groupUuid'] instanceof Array)
      ? query['groupUuid']
      : [query['groupUuid']]
    : [];
  const categoryQuery = query['categoryUuid']
    ? (query['categoryUuid'] instanceof Array)
      ? query['categoryUuid']
      : [query['categoryUuid']]
    : [];

  function handleGroupsSubmit(values) {
    navigate(objectToQuery({
      groupUuid: values,
      categoryUuid: categoryQuery,
    }));
  }

  function handleCategoriesSubmit(values) {
    navigate(objectToQuery({
      groupUuid: groupQuery,
      categoryUuid: values,
    }));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['section']}>
        <Groups values={groupQuery} onChange={handleGroupsSubmit} />
      </div>
      <div className={styles['section']}>
        <Category values={categoryQuery} onChange={handleCategoriesSubmit} />
      </div>
    </div>
  );
}

export default Filter;
