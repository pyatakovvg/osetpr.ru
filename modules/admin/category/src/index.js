
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  selectItems,
  selectInProcess,
} from './ducks/slice';

export {
  getCategories,
  updateCategories,
} from './ducks/commands';