import React, { Component } from 'react';
import { Platform } from 'react-native';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducer from './reducers';

function configureStore() {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
  
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  
  return store;
}

const store = configureStore();

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}