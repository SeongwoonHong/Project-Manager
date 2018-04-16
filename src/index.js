import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import './index.css';
import App from './containers/App/App';
import Navigation from './components/Navigation/Navigation';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" component={ App } />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
