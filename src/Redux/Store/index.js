// Imports: Dependencies
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Imports: Redux Root Reducer
import rootReducer from '../Reducers';

// Imports: Redux Root Saga
import rootSaga  from '../Sagas';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  blacklist:[
    'TemporalProperties',
    'Hospitals',
    'Medics'
  ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

// // Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    sagaMiddleware
  )
);
const persistor = persistStore(store);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export {
  store,
  persistor
}


// export default ()=> {
//   const sagaMiddleware = createSagaMiddleware();
//   return {
//     ...createStore(rootReducer,applyMiddleware(sagaMiddleware)),
//     runSaga:createSagaMiddleware.run(rootSaga)
//   }
// }
