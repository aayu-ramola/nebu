import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { categories } from './categories.reducer';
import { loader } from './loader.reducer';

const rootReducer = combineReducers({
	authentication,
	alert,
	categories,
	loader
});

export default rootReducer;