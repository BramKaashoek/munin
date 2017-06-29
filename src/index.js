//src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './index.css';

import BatchesContainer from './components/batches/BatchesContainer'
import Batch from './components/batches/Batch'
import SignIn from './components/users/SignIn'


injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={BatchesContainer} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/batches/:batchId" component={Batch} />
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
