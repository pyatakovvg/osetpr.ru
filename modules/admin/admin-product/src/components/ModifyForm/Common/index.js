
import { selectCategories, selectInProcess } from "@modules/admin-product";

import { CheckBoxField, Col, Header, InputField, Row, SelectField, EditorField } from "@ui.packages/admin-kit";

import React from 'react';
import { useSelector } from "react-redux";

import styles from './default.module.scss';


function Common() {
  const categories = useSelector(selectCategories);
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={3}>Основные</Header>
      </div>
      <div className={styles['content']}>
        <Row>
          <Col>
            <InputField name="externalId" label="Номер товара (генерируется автоматически)" disabled />
          </Col>
          <Col className={styles['is-use']}>
            <CheckBoxField name="isUse" label="отображать в каталоге" />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              name={'title'}
              label={'Название'}
            />
          </Col>
          <Col>
            <SelectField
              require
              simple
              name="categoryId"
              label="Категория"
              options={categories}
              optionKey="id"
              optionValue="value"
              disabled={inProcess}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorField
              require
              name="description"
              label="Описание"
              disabled={inProcess}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Common;
