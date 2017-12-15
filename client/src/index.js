import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers/index.js';
import App from './App.jsx';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
const socket = io('http://qollab.westus2.cloudapp.azure.com:3003/');
const socketIoMiddleware = createSocketIoMiddleware(socket, "socket/");
const store = applyMiddleware(socketIoMiddleware)(createStore)(reducers);
store.dispatch({type:'socket/hello', data:'Hello!'});

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