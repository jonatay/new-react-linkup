import { combineReducers } from 'redux';
import { aclFrontReducer } from './index';

// eslint-disable-next-line import/prefer-default-export
export const commonReducer = combineReducers({
	// auth: authReducer,
	acl: aclFrontReducer
});
