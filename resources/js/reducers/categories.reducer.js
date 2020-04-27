import { categoriesConstants } from '../constants';

const initialState = {
};

export function categories(state = initialState, action) {

	switch(action.type) {
		case categoriesConstants.GETALL_IN_TREE_DATA_REQUEST:
			return {
				...state
			};
		case categoriesConstants.GET_RESPONSE_DATA_REQUEST:
			return {
				...state

			};

        case categoriesConstants.GET_RESPONSE_SUCCESS:
			return {
				...state,
				getResponse: action.categories
			};

		case categoriesConstants.GETALL_IN_TREE_DATA_SUCCESS:
			return {
				...state,
				categoriesInTreeData: action.categories
			};

		case categoriesConstants.GETALL_IN_TREE_DATA_FAILURE:
      return {
				...state
			};

		case categoriesConstants.GETALL_REQUEST:
				return {
					...state
				};
		case categoriesConstants.GETALL_SUCCESS:
			return {
				...state,
				categories: action.categories
			}
		case categoriesConstants.UPDATE_FAILURE:
			return {
				...state,
			};
		case categoriesConstants.CREATE_REQUEST:
			return {
				...state,
			}
		case categoriesConstants.CREATE_SUCCESS:
				return {
					...state,
				}
		case categoriesConstants.CREATE_FAILURE:
			break;
		case categoriesConstants.IMPORT_CATEGORIES_FILE_REQUEST:
				return {
					...state,
				}
		case categoriesConstants.IMPORT_CATEGORIES_FILE_SUCCESS:
				return {
					...state,
				}
		case categoriesConstants.IMPORT_CATEGORIES_FILE_FAILURE:
				return {
					...state,
				}
		case categoriesConstants.CLEAR_ALL_CATEGORIES_REQUEST:
				return {
					...state,
				}
		case categoriesConstants.CLEAR_ALL_CATEGORIES_SUCCESS:
				return {
					...state,
				}
		case categoriesConstants.CLEAR_ALL_CATEGORIES_FAILURE:
				return {
					...state,
				}
    default:
      return state
	}
}