
import { selectGroups, selectCategories, selectInProcess } from "@modules/admin-product";

import { Col, Header, Row, SelectField } from "@ui.packages/admin-kit";

import React from 'react';
import { useSelector } from "react-redux";

import styles from './default.module.scss';


function Types() {
  const groups = useSelector(selectGroups);
  const categories = useSelector(selectCategories);
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={3}>Классификация</Header>
      </div>
      <div className={styles['content']}>
        <Row>
          <Col>
            <SelectField
              simple
              name="groupUuid"
              label="Группа"
              options={groups}
              optionKey="uuid"
              optionValue="value"
              disabled={inProcess}
            />
          </Col>
          <Col>
            <SelectField
              simple
              name="categoryUuid"
              label="Категория"
              options={categories}
              optionKey="uuid"
              optionValue="value"
              disabled={inProcess}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Types;
