
import { selectInProcess } from '@modules/admin-payments';

import { Row, Col, Text, Button, Draggable } from '@ui.packages/admin-kit';

import React from 'react';
import types from 'prop-types';
import { useSelector } from "react-redux";
import { FieldArray } from "redux-form";

import ItemField from './ItemField';

import styles from './default.module.scss';


function ItemList({ fields, disabled }) {
  function handleRemoveAttr(index) {
    fields.remove(index)
  }

  function handleChangeOrder(from, to) {
    if (from !== null && to !== null) {
      fields.move(from, to);
    }
  }

  return (
    <Row>
      <div className={styles['attrs']}>
        { ! fields.length && (
          <Text type={Text.TYPE_BODY}>Добавьте способ оплаты</Text>
        )}
        { !! fields.length && (
          <Draggable onChange={(from, to) => handleChangeOrder(from, to)}>
            {fields.map((field, index) => {
              return (
                <ItemField
                  key={index}
                  field={field}
                  disabled={disabled}
                  onRemove={() => handleRemoveAttr(index)}
                />
              )
            })}
          </Draggable>
        )}
      </div>
    </Row>
  );
}

function ModesField({ fields, disabled }) {
  function handleAddAttr() {
    fields.push({});
  }

  return (
    <div className={styles['wrapper']}>
      <ItemList disabled={disabled} fields={fields} />
      <Row>
        <Col className={styles['align-right']}>
          <Button
            form={Button.FORM_CREATE}
            mode={Button.MODE_PRIMARY}
            size={Button.SIZE_SMALL}
            disabled={disabled}
            onClick={() => handleAddAttr()}
          >Добавить способ</Button>
        </Col>
      </Row>
    </div>
  );
}

ModesField.propTypes = {
  fields: types.object,
  disabled: types.bool,
};

ModesField.defaultProps = {
  fields: null,
  disabled: false,
};


function Groups({ handleSSubmit }) {
  const inProcess = useSelector(selectInProcess);

  return (
    <form className={styles['block']} onSubmit={handleSSubmit}>
      <div className={styles['content']}>
        <FieldArray
          name="bulk"
          validate={[(value) => ! value]}
          component={ModesField}
          disabled={inProcess}
        />
      </div>
    </form>
  );
}

export default Groups;
