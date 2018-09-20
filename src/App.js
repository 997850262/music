import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import configureStore from './store/configureStore';
/* eslint-disable */
import { Router, browserHistory  } from 'react-router';
// import routes from './routes';
import Music from './Container/Music';

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Router routes={routes} history={browserHistory } /> */}
        <Music />
      </Provider>
    );
  }
}

export default App;
