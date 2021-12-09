
export { default as Dialog } from './Dialog';
export { default as Confirm } from './Confirm';

export { name, reducer, selectIsOpen, selectName, selectData } from './ducks/slice';
export { openDialog, closeDialog } from './ducks/commands';