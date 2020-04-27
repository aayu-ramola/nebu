import { categoriesConstants } from '../constants';
import { categoriesService } from '../services';
import { alertActions } from './alert.actions';
import { loaderActions } from './loader.actions';

export const categoriesActions= {
	getAllInTreeData, getAll, create, update, remove, importCategoriesFile, clearAllCategories,createResponseCategory,getAllCategoryResponse,getResponse
}


function createResponseCategory(data) {
	return dispatch => {
		//dispatch(request());
		return categoriesService.createResponseCategory(data)
		.then((response) => {
			if(response.isSucceeded) {
				return response.data;
			} else {
				dispatch(alertActions.error(response.message));
			}
		});
	}
}

function getResponse(){
	return dispatch => {
		dispatch(loaderActions.show());
		categoriesService.getResponse()
		.then((response) => {
			dispatch(loaderActions.hide());
			if(response.isSucceeded) {
				dispatch(success(response.data));
			} else {
				dispatch(failure(response.message));
				dispatch(alertActions.error(response.message));
			}
		});
	}

	function success(categories) { return { type: categoriesConstants.GET_RESPONSE_SUCCESS, categories } }
	function failure(error) { return { type: categoriesConstants.GET_RESPONSE_FAILURE, error } }
}

function getAllCategoryResponse(){
	return dispatch => {
		dispatch(loaderActions.show());
		categoriesService.getAllCategoryResponse()
		.then((response) => {
			dispatch(loaderActions.hide());
			if(response.isSucceeded) {
				dispatch(success(response.data));
			} else {
				dispatch(failure(response.message));
				dispatch(alertActions.error(response.message));
			}
		});
	}

	function success(categories) { return { type: categoriesConstants.GETALL_IN_TREE_DATA_SUCCESS, categories } }
	function failure(error) { return { type: categoriesConstants.GETALL_IN_TREE_DATA_FAILURE, error } }
}


function getAllInTreeData() {
	return dispatch => {
		dispatch(loaderActions.show());
		categoriesService.getAllInTreeData()
		.then((response) => {
			dispatch(loaderActions.hide());
			if(response.isSucceeded) {
				dispatch(success(response.data));

			} else {
				dispatch(failure(response.message));
				dispatch(alertActions.error(response.message));
			}
		});
	}

	function success(categories) { return { type: categoriesConstants.GETALL_IN_TREE_DATA_SUCCESS, categories } }
	function failure(error) { return { type: categoriesConstants.GETALL_IN_TREE_DATA_FAILURE, error } }
}

function getAll() {
	return dispatch => {
		dispatch(loaderActions.show());
		categoriesService.getAll()
		.then((response) => {
			dispatch(loaderActions.hide());
			if(response.isSucceeded) {
				dispatch(success(response.data));
			} else {
				dispatch(failure(response.message));
				dispatch(alertActions.error(response.message));
			}
		});
	}
	
	function success(categories) { return { type: categoriesConstants.GETALL_SUCCESS, categories } }
	function failure(error) { return { type: categoriesConstants.GETALL_FAILURE, error } }
}

function create(data) {
	return dispatch => {
		//dispatch(request());
		return categoriesService.create(data)
		.then((response) => {
			if(response.isSucceeded) {
				return response.data;
			} else {
				dispatch(alertActions.error(response.message));
			}
		});
	}
}

function update(categoryId, data) {
	return dispatch => {
		//dispatch(request());
		return categoriesService.update(categoryId, data)
		.then((response) => {
			if(response.isSucceeded) {
				return response.data;
			} else {
				dispatch(alertActions.error(response.message));
			}
		});
	}
}

function remove(categoryId) {
	return dispatch => {
		//dispatch(request());
		return categoriesService.remove(categoryId)
		.then((response) => {
			if(response.isSucceeded) {
				return response.data;
			} else {
				dispatch(alertActions.error(response.message));
			}
		});
	}
}

function importCategoriesFile(files) {
	return dispatch => {
		dispatch(loaderActions.show());
		return categoriesService.importCategoriesFile(files)
		.then((response) => {
			dispatch(loaderActions.hide());
			if(response.isSucceeded) {
				dispatch(success());
				return response.data;
			} else {
				dispatch(alertActions.error(response.message));
				dispatch(failure(response.message));
			}
		});
	}

	function success() { return { type: categoriesConstants.IMPORT_CATEGORIES_FILE_SUCCESS } }
	function failure(error) { return { type: categoriesConstants.IMPORT_CATEGORIES_FILE_FAILURE, error } }
}

function clearAllCategories() {
	return dispatch => {
		dispatch(loaderActions.show());
		return categoriesService.clearAllCategories()
		.then((response) => {
			dispatch(loaderActions.hide());
			if(response.isSucceeded) {
				dispatch(success());
				return response.data;
			} else {
				dispatch(alertActions.error(response.message));
				dispatch(failure(response.message));
			}
		});
	}

	function success() { return { type: categoriesConstants.CLEAR_ALL_CATEGORIES_SUCCESS } }
	function failure(error) { return { type: categoriesConstants.CLEAR_ALL_CATEGORIES_FAILURE, error } }
}