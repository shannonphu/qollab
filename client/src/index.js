import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers/allReducers.js';
import App from './App.jsx';

const store = createStore(allReducers);

const router = (
	<Provider store={store}>
	 	<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(
  router,
  document.getElementById('root')
)