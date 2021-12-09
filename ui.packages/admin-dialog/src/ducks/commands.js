
import { openDialogAction, closeDialogAction } from './slice';


export const openDialog = (name, data) => (dispatch) => {
  dispatch(openDialogAction({ name, data }));
};

export const closeDialog = (dialogName) => (dispatch) => {
  dispatch(closeDialogAction(dialogName));
};
