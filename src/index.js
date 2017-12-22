import React, { Component } from 'react';
import { 
  Platform,
  AsyncStorage,
} from 'react-native';
import { 
  persistStore,
  persistCombineReducers,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './containers/App';
import { Provider } from 'react-redux';
import { 
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from './reducers';

const config = {
  key: 'root',
  storage: AsyncStorage,
}

const reducer = persistCombineReducers(config, {reducers});

function configureStore() {
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      composeWithDevTools()
    )
  );
  
  const persistor = persistStore(store);
  
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  
  return { persistor, store };
}

const { persistor, store } = configureStore();

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}