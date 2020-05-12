import { Orders } from '../../Consts/actionsTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case Orders.ADDLIST:
      console.log(action,state);
      return [...state,action.data];
    default:
      return initialState;
  }
}

