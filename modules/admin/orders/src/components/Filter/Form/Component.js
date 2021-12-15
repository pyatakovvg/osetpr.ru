
import { selectStatuses } from '@modules/admin-orders';

import { InputField, DatePickerField, SelectField, Button } from '@ui.packages/admin-kit';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './default.module.scss';


function Form({ handleSubmit }) {
  const statuses = useSelector(selectStatuses);

  return (
    <form className={styles['wrapper']} onSubmit={handleSubmit}>
      <div className={styles['line']}>
        <div className={styles['col']} style={{ flex: '0 0 auto', width: '176px' }}>
          <InputField
            label={'Номер заказа'}
            name={'externalId'}
          />
        </div>
        <div className={styles['col']}>
          <div className={styles['field']}>
            <div className={styles['value']}>
              <DatePickerField
                label={'Дата создания'}
                name={'minDateCreate'}
                useTime
              />
            </div>
            <span className={styles['delimiter']}>-</span>
            <div className={styles['value']}>
              <DatePickerField
                name={'maxDateCreate'}
                useTime
              />
            </div>
          </div>
        </div>
        <div className={styles['col']}>
          <div className={styles['field']}>
            <div className={styles['value']}>
              <DatePickerField
                label={'Дата доставки'}
                name={'minDateTo'}
                useTime
              />
            </div>
            <span className={styles['delimiter']}>-</span>
            <div className={styles['value']}>
              <DatePickerField
                name={'maxDateTo'}
                useTime
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles['line']}>
        <div className={styles['col']} style={{ flex: '0 0 auto', width: '176px' }}>
          <InputField
            label={'Артикул'}
            name={'vendor'}
          />
        </div>
        <div className={styles['col']} style={{ flex: '0 0 auto', width: '200px' }}>
          <SelectField
            label={'Статус'}
            name={'status'}
            optionKey={'code'}
            optionValue={'displayName'}
            options={statuses}
          />
        </div>
        <div className={styles['col']}>
          <div className={styles['field']}>
            <div className={styles['value']}>
              <InputField
                label={'Сумма заказа'}
                name={'minPrice'}
              />
            </div>
            <span className={styles['delimiter']}>-</span>
            <div className={styles['value']}>
              <InputField
                name={'maxPrice'}
              />
            </div>
          </div>
        </div>
        <div className={styles['col']} style={{ flex: '0 0 auto', width: '160px' }}>
          <Button type={'submit'} mode={'primary'}>Применить</Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
