
import { selectFilter } from '@modules/admin-products';

import { InputField, SelectField, CheckBoxField, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


function Form({ handleSubmit }) {
  const filter = useSelector(selectFilter);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['line']}>
        <div className={styles['col']}>
          <InputField
            label={'Номер товара'}
            name={'externalId'}
          />
        </div>
        <div className={styles['col']}>
          <SelectField
            label={'Группа'}
            name={'groupUuid'}
            optionKey={'uuid'}
            optionValue={'value'}
            options={filter['groups']}
          />
        </div>
        <div className={styles['col']}>
          <SelectField
            label={'Категория'}
            name={'categoryUuid'}
            optionKey={'uuid'}
            optionValue={'value'}
            options={filter['categories']}
          />
        </div>
        <div className={styles['col']}>
          <InputField
            label={'Артикул'}
            name={'vendor'}
          />
        </div>
      </div>
      <div className={styles['line']}>
        <div className={styles['col']}>
          <div className={styles['field']}>
            <div className={styles['value']}>
              <InputField
                label={'Цена'}
                name={'minAmount'}
              />
            </div>
            <span className={styles['delimiter']}>-</span>
            <div className={styles['value']}>
              <InputField
                name={'maxAmount'}
              />
            </div>
          </div>
        </div>
        <div className={cn(styles['col'], styles['padding'])}>
          <CheckBoxField label={'только активные'} name={'isUse'} />
        </div>
        <div className={cn(styles['col'], styles['padding'])}>
          <CheckBoxField label={'в наличии'} name={'isAvailable'} />
        </div>
        <div className={styles['col']}>
          <Button type={'submit'} mode={'primary'}>Применить</Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
