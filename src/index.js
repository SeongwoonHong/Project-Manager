import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

import App from 'containers/App/App';
import Landing from 'containers/Landing/Landing';
import Navigation from 'components/Navigation/Navigation';
import reducers from './reducers';
import './index.css';

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
          <Route path="/project/:name" component={ App } />
          <Route exact path="/" component={Landing} />
          <Redirect to="/" />
        </Switch>
        <ToastContainer autoClose={3000} />
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
