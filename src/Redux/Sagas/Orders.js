import { takeLatest, put, select } from 'redux-saga/effects';
import { Orders } from '../../Consts/actionsTypes';

function* saveOrder({selectedDate}) {
    console.log("Saga selectedDate :",selectedDate);
    let data   = {
        ...{date:selectedDate}
    }
    let toSave = {
        data        : data          ,
        type        : Orders.ADDLIST,
    };
    console.log(toSave);
    yield put(toSave);
}

export default function* OrdersWatcher() {
    yield takeLatest(Orders.SAVE_ORDER, saveOrder);
    //yield takeLatest(ON_GET_PICTURE, reciveImage);
} 