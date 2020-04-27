import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

require('./bootstrap'); 

import Login from './containers/login';
import Full from './containers/full';
import { store, history } from './helper';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
			localStorage.getItem('user')
				? <Component {...props} />
				: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
	)} />
)
 
ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route exact path="/login" name="Login" component={Login}/>
				<PrivateRoute path="/" name="Full" component={Full}/>
			</Switch>
		</Router>
	</Provider>
), document.getElementById('root'));
