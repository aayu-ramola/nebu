import axios from 'axios';
import { Promise } from 'q';

import { authHeader, interceptors } from '../helper';

export const categoriesService = {
	getAll, getAllInTreeData, create, update, remove, importCategoriesFile, clearAllCategories , createResponseCategory,getAllCategoryResponse,getResponse
};

function createResponseCategory(data) {
	return axios.post("/api/response/store", data, {
		headers: authHeader()
	})
	.then(handleResponse);
}

function getResponse(){
	return axios.get("/api/response/getResponse",{
		headers: authHeader()
	})
	.then(handleResponse);
}


function getAllCategoryResponse() {
	return axios.get("/api/response/getAllCategoryResponse", {
		headers: authHeader()
	})
	.then(handleResponse);
}

function getAllInTreeData() {
	return axios.get("/api/categories/getAllCategoriesInTreeData", {
		headers: authHeader()
	})
	.then(handleResponse);
}

function create(data) {
	return axios.post("/api/categories/add", data, {
		headers: authHeader()
	})
	.then(handleResponse);
}

function update(categoryId, data) {
	return axios.post("/api/categories/update/" + categoryId, data, {
		headers: authHeader()
	})
	.then(handleResponse);
}

function getAll() {
	return axios.get("/api/categories/get", {
		headers: authHeader()
	})
	.then(handleResponse);
}

function remove(categoryid) {
	return axios.delete("/api/categories/delete/"+ categoryid, {
		headers: authHeader()
	})
	.then(handleResponse);
}

function importCategoriesFile(files) {
	let form = new FormData();
	form.append("categories", files[0]);
	return axios.post("/api/categories/import", form, {
		headers: authHeader()
	})
	.then(handleResponse);
}

function clearAllCategories() {
	return axios.delete("/api/categories/clear", {
		headers: authHeader()
	})
	.then(handleResponse);
}

function handleResponse(response) {
	return new Promise((resolve, reject) => {
		if(response.status !== 200) {
			const error = (response.data && response.data.message) || response.statusText;
			reject(error);
		}
		resolve(response.data);
	});
}

