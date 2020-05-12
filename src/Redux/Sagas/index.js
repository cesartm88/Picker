// Imports: Dependencies
import { all }                from 'redux-saga/effects';
import   OrdersWatcher       from './Orders';


// Redux Saga: Root Saga
export default function* rootSaga() {
  yield all([
    OrdersWatcher      (),
  ]);
};

