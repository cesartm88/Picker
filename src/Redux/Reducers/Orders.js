import { Orders } from '../../Consts/actionsTypes';

const initialState = {
  Orders:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Orders.ADDLIST:
      console.log(action.data,state);
      return {
        ...state,
        ['Orders']:[
          ...state['Orders'],
          action.data
        ]
      };
    default:
      return state;
  }
}

