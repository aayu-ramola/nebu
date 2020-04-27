import { responseConstants } from '../constants';

const initialState = {
};

export function categories(state = initialState, action) {
	switch(action.type) {
	   case categoriesConstants.GETALL_IN_TREE_DATA_SUCCESS:
			return {
				...state,
				categoriesInTreeData: action.categories
			}
    default:
      return state
	}
}