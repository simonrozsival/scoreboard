import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

// The logic of the app:

import * as reducers from './reducers';

// Components for the router:

import { App } from './components';
import { Overview, TeamDetails } from './containers';


// Create the redux store and load the initial state:
const engine = createEngine('odraz-betgames');

// Combine the logic of the app with the router library
const reducer = storage.reducer(
	combineReducers({
		...reducers,
		routing: routerReducer
	})
);

// Create the store with all the needed middleware and store enhancers
const finalCreateStore = compose(
	applyMiddleware(
		// Save all state changes to localStorage. Works like a charm.
		// It is neccessary not to save the initialisation of the redux though
		// - the initial ("empty") state would override the loaded state otherwise.
		storage.createMiddleware(engine, [ '@@INIT' ])
	),
	// allow the Chrome DevTools extension
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = finalCreateStore(reducer);

// load persisted state first from the localStorage
const load = storage.createLoader(engine);
load(store)
	.then(() => {
		// using hash history allows the app to be used without any
		// server-side code for routing
		const history = syncHistoryWithStore(hashHistory, store);
		ReactDOM.render(
		  <Provider store={store}>
				<Router history={history}>
					<Route path="/" component={App}>
						<IndexRedirect to="/overview" />
						<Route path="overview" component={Overview} />
						<Route path="team/:teamId" component={TeamDetails} />
					</Route>
				</Router>
			</Provider>,
			document.getElementById('app')
		);
	})
	.catch(() => console.log('Cannot load persisted app state'));
