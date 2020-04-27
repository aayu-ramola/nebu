import axios from 'axios';
import { Promise } from 'q';

export const userService = {
	login, logout, create, update, getAll, getById
};

function login(emailId, password) {
	return axios.post("/api/login", {
		"email": emailId,
		"password": password
	})
	.then(handleResponse)
	.then((response) => {
		return response;
	});
}

function logout() {
	localStorage.removeItem('user');
}

function create() {

}

function update() {

}

function getAll() {

}

function getById() {
	
}

function handleResponse(response) {
	//console.log(response);
	return new Promise((resolve, reject) => {
		if(response.status !== 200) {
			if(response.status === 401) {
				logout();
				location.reload(true);
			}
			const error = (response.data && response.data.message) || response.statusText;
			reject(error);
		}
		resolve(response.data);
	});
}