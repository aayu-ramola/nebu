import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helper';
import { alertActions } from './alert.actions';

export const userActions = {
	login,
	logout,
	create	
}

function login(username, password) {
	return dispatch => {
		dispatch(request({ username }));
		userService.login(username, password)
		.then((response) => {
			//console.log(response);
			if(response.isSucceeded) {
				localStorage.setItem('user', JSON.stringify(response.user));
				history.push('/');
				dispatch(success(response.user));
			} else {
				dispatch(failure(response.message));
				dispatch(alertActions.error(response.message));
			}
		});
	}

	function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
	function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}

function create() {
	
}