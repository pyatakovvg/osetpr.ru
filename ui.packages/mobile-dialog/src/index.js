
export { default as Dialog } from './Dialog';
export { default as Window } from './Window';
export { default as Confirm } from './Confirm';

export {
  selectIsOpen,
  selectName,
  selectData
} from './ducks/slice';

export {
  openDialog,
  closeDialog
} from './ducks/commands';

export { name, reducer } from './ducks/slice';