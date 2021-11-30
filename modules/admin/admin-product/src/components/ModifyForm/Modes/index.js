
import { selectInProcess, selectCurrencies } from '@modules/admin-product';

import { UUID } from '@ui.packages/utils';
import { Row, Col, Text, InputField, SelectField, Button, Draggable, CheckBoxField, Header } from '@ui.packages/admin-kit';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { FieldArray, getFormValues, change } from "redux-form";

import cn from 'classnames';
import styles from './default.module.scss';


function ModeField({ field, disabled, onRemove }) {
  const dispatch = useDispatch();

  const currencies = useSelector(selectCurrencies);
  const values = useSelector(getFormValues('product-modify'));

  function handleRemove() {
    onRemove && onRemove();
  }

  function handleChangeTarget() {
    for (let index in values['modes']) {
      dispatch(change('product-modify', 'modes[' + index + '].isTarget', false));
    }
    dispatch(change('product-modify', `${field}.isTarget`, true));
  }

  const classNameRemoveAttr = cn(styles['attr__remove'], 'far fa-trash-alt');

  return (
    <div className={styles['attr']}>
      <div className={styles['checkbox']}>
        <CheckBoxField isFixed name={`${field}.isTarget`} onChange={(value) => handleChangeTarget(value)} />
      </div>
      <div className={styles['checkbox']}>
        <CheckBoxField isFixed name={`${field}.isUse`} />
      </div>
      <div className={styles['attr__value']}>
        <InputField
          require
          name={`${field}.vendor`}
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__title']}>
        <InputField
          require
          name={`${field}.value`}
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__price']}>
        <InputField
          require
          name={`${field}.price`}
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__currency']}>
        <SelectField
          require
          simple
          clearable={false}
          name={`${field}.currencyCode`}
          options={currencies}
          optionKey="code"
          optionValue="displayName"
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__controls']}>
        <span className={classNameRemoveAttr} onClick={() => handleRemove()} />
      </div>
    </div>
  );
}

ModeField.propTypes = {
  field: types.string,
  onRemove: types.func,
};

ModeField.defaultProps = {
  field: '',
};

function OptionsList({ fields, disabled }) {
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
          <Text type={Text.TYPE_BODY}>Добавите модификацию</Text>
        )}
        { !! fields.length && (
          <Draggable onChange={(from, to) => handleChangeOrder(from, to)}>
            {fields.map((field, index) => {
              return (
                <ModeField
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
  const currencies = useSelector(selectCurrencies);

  function handleAddAttr() {
    let isTarget = false;
    if ( ! fields.length) {
      isTarget = true;
    }
    fields.push({ uuid: UUID(), isUse: true, isTarget, currencyCode: currencies[0]['code'] });
  }

  return (
    <div className={styles['wrapper']}>
      <OptionsList disabled={disabled} fields={fields} />
      <Row>
        <Col className={styles['align-right']}>
          <Button
            form={Button.FORM_CREATE}
            mode={Button.MODE_PRIMARY}
            size={Button.SIZE_SMALL}
            disabled={disabled}
            onClick={() => handleAddAttr()}
          >Добавить комплектацию</Button>
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


function Modes() {
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <Header level={3}>Комплектация</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['labels']}>
          <div className={styles['label']}>
            <span className={cn(styles['icon'], 'fas fa-arrows-alt')} />
          </div>
          <div className={styles['label']}>
            <Text>T</Text>
          </div>
          <div className={styles['label']}>
            <Text>A</Text>
          </div>
          <div className={styles['label']}>
            <Text>Артикул</Text>
          </div>
          <div className={styles['label']}>
            <Text>Значение</Text>
          </div>
          <div className={styles['label']}>
            <Text>Цена</Text>
          </div>
          <div className={styles['label']}>
            <Text>Валюта</Text>
          </div>
          <div className={styles['label']}>
            <span className={cn(styles['icon'], 'fas fa-exclamation')} />
          </div>
        </div>
        <FieldArray
          name="modes"
          validate={[(value) => ! value]}
          component={ModesField} disabled={inProcess}
        />
      </div>
    </div>
  );
}

export default Modes;
