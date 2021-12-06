
// import { selectInProcess } from '@ui.packages/order';
import { Header } from '@ui.packages/client-kit';

import React from 'react';
// import { useDispatch } from 'react-redux';
// import { change, submit } from 'redux-form';

import styles from './default.module.scss';


function DetailsForm() {
  // const dispatch = useDispatch();

  // const inProcess = useSelector(selectInProcess);
  // const values = useSelector(getFormValues(form));

  // function changeDateTo(value) {
  //   dispatch(change('order-modify', 'dateTo', value));
  // }
  //
  // async function handleResetTime() {
  //   await dispatch(change('order-modify', 'dateTo', null));
  //   dispatch(submit(form));
  // }

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={2}>Время доставки</Header>
      </div>
      <div className={styles['content']}>
        <div className={styles['row']}>
          {/*<Datepicker value={values['dateTo']} onChange={(value) => changeDateTo(value)} />*/}
        </div>
      </div>
    </div>
  );
}

export default DetailsForm;
