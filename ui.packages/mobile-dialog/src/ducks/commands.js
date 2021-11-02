
import { openDialogAction, closeDialogAction } from './slice';


export const openDialog = (name, data) => (dispatch) => {
  dispatch(openDialogAction({ name, data }));
};

export const closeDialog = () => (dispatch) => {
  dispatch(closeDialogAction());
};
