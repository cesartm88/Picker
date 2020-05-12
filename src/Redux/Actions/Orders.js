import { Orders } from '../../Consts/actionsTypes';

export const saveOrder = data => {
    return {
        type : Orders.SAVE_ORDER,
        ...data
    }
};