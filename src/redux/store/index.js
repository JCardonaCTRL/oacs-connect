// store/index.js

import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// imports: redux
import rootReducer from '../reducers/index';

// middleware: redux persist config
const persistConfig = {
    // root
    key: 'root',
    // storage method (react native)
    storage: AsyncStorage,
    // reconciler
    stateReconciler: autoMergeLevel2,
    // whitelist (to persist specific reducers); -- does not persist data if used this way with whitelist. may have to do with combinedReducers() being used for rootReducer passed into PersistedReducer()
    // whitelist: [
    //     'dgsomObjectReducer',
    //     'tileListObjectReducer',
    // ],
    // blacklist 
    blacklist: [
    'navigation'   
    ]
};

// middleware: redux persist persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// redux: store
const store = createStore(
    persistedReducer, 
    applyMiddleware(createLogger())
);

// middleware: redux persist persister
let persistor = persistStore(store);

// exports
export {
    store,
    persistor,
};
