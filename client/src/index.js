import React from "react";
import ReactDOM from "react-dom";
// import react router dom
import { Router } from "react-router-dom";
// import history object
import history from "./History";
// import provider to hook up redux store to app
import { Provider } from "react-redux";
// import redux and redux thunk to create store and perform async http requests
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
// import main component
import App from "./components/App";
//import reducers
import reducers from "./reducers";
// hook up devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);
// render the main app with redux store and history object on to the div(id="root")
// in the index.html file
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
