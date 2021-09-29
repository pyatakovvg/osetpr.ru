
import { selectInProcess, selectCurrencies } from '@modules/admin-product';

import { UUID } from '@ui.packages/utils';
import { Row, Col, InputField, SelectField, Button, Draggable, CheckBoxField, Header } from '@ui.packages/admin-kit';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { FieldArray, getFormValues, change } from "redux-form";

import cn from 'classnames';
import styles from './default.module.scss';


function OptionField({ field, disabled, onRemove }) {
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
          label="Артикул"
          name={`${field}.vendor`}
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__title']}>
        <InputField
          require
          label="Значение"
          name={`${field}.value`}
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__price']}>
        <InputField
          require
          name={`${field}.price`}
          label="Цена"
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__currency']}>
        <SelectField
          require
          simple
          clearable={false}
          name={`${field}.currencyCode`}
          label="Валюта"
          options={currencies}
          optionKey="code"
          optionValue="value"
          disabled={disabled}
        />
      </div>
      <div className={styles['attr__controls']}>
        <span className={classNameRemoveAttr} onClick={() => handleRemove()} />
      </div>
    </div>
  );
}

OptionField.propTypes = {
  field: types.string,
  onRemove: types.func,
};

OptionField.defaultProps = {
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

  if ( ! fields.length) {
    return null;
  }

  return (
    <Row>
      <div className={styles['attrs']}>
        <Draggable onChange={(from, to) => handleChangeOrder(from, to)}>
          {fields.map((field, index) => {
            return (
              <OptionField
                key={index}
                field={field}
                disabled={disabled}
                onRemove={() => handleRemoveAttr(index)}
              />
            )
          })}
        </Draggable>
      </div>
    </Row>
  );
}

function OptionsField({ fields, disabled }) {
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

OptionsField.propTypes = {
  fields: types.object,
  disabled: types.bool,
};

OptionsField.defaultProps = {
  fields: null,
  disabled: false,
};


function Options() {
  const inProcess = useSelector(selectInProcess);

  return (
    <div className={styles['block']}>
      <div className={styles['header']}>
        <Header level={3}>Комплектация</Header>
      </div>
      <div className={styles['content']}>
        <FieldArray
          name="modes"
          validate={[(value) => ! value]}
          component={OptionsField} disabled={inProcess}
        />
      </div>
    </div>
  );
}

export default Options;
