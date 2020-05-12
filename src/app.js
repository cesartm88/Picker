/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import   React                          from 'react';
import { Provider }                     from 'react-redux';
import { PersistGate }                  from 'redux-persist/integration/react';
import   Routes, { NavigationService }  from './Routes';
// Imports: Redux Store
import { store, persistor }             from './Redux/Store';

export default () => {
    const prefix = 'pickerApp://';
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes uriPrefix={prefix} ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }} />
            </PersistGate>
        </Provider>
    );  
    
}
