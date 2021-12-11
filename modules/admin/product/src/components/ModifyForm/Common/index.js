
import { selectInProcess } from "@modules/admin-product";

import { Col, Header, InputField, Row, EditorField, Button } from "@ui.packages/admin-kit";

import React from 'react';
import { change } from 'redux-form';
import { useSelector, useDispatch } from "react-redux";

import styles from './default.module.scss';


function Common() {
  const dispatch = useDispatch();

  const inProcess = useSelector(selectInProcess);

  function handleGenerateExternalId() {
    const externalId = Date.now().toString(32);
    dispatch(change('product-modify', 'externalId', externalId));
  }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={3}>Основные</Header>
      </div>
      <div className={styles['content']}>
        <Row>
          <Col>
            <div className={styles['external-id']}>
              <div className={styles['input']}>
                <InputField name="externalId" label="Номер товара" maxLength={9} />
              </div>
              <div className={styles['button']}>
                <Button mode={'primary'} onClick={handleGenerateExternalId}>Сгенерировать</Button>
              </div>
            </div>
          </Col>
          <Col/>
        </Row>
        <Row>
          <Col>
            <InputField
              name={'title'}
              label={'Название'}
            />
          </Col>
          <Col>
            <InputField
              name={'originalName'}
              label={'Оригинальное название'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorField
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
