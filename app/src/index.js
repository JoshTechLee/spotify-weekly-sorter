import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxReset from 'redux-reset';

import './index.css';
import App from './App';
import rootReducer from './redux/reducers/index';
import saga from './redux/middleware/saga';

const createElectronStorage = window.require('redux-persist-electron-storage');
const ElectronStore = window.require('electron-store');
const electronStore = new ElectronStore();

const storage = createElectronStorage({ electronStore });
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const enhanceCreateStore = compose(applyMiddleware(sagaMiddleware), reduxReset())(createStore);
const store = enhanceCreateStore(persistedReducer);

sagaMiddleware.run(saga);

ReactDOM.render(
    <React.StrictMode>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <Provider store={store}>
                <App />
            </Provider>
        </PersistGate>
    </React.StrictMode>,
    document.getElementById('root')
);
