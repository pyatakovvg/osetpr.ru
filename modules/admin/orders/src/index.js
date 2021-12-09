
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  setProcessAction,

  selectMeta,
  selectItems,
  selectStatuses,
  selectCustomers,
  selectInProcess,
  selectItemsInProcess,

  updateItemAction
} from './ducks/slice';

export {
  getItems,
  updateStatus,
} from './ducks/commands';