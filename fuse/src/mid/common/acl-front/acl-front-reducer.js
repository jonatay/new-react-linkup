/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { aclFrontActions } from './acl-front-actions';

export function aclFrontReducer(state = { acl: {}, uid: '' }, { payload, type }) {
	switch (type) {
		case aclFrontActions.ACL_FRONT_ON_SET_UID:
			return { ...state, uid: payload.uid };
		case aclFrontActions.ACL_FRONT_ON_LOAD:
			return { ...state, acl: payload.acl };
		case aclFrontActions.ACL_FRONT_ON_CHANGE:
			return {
				...state,
				acl: {
					...state.acl,
					...Object.keys(payload).map(key => payload[key])[0]
				}
			};
		case aclFrontActions.ACL_FRONT_ON_ADD:
			return {
				...state,
				acl: {
					...state.acl,
					...payload.data
				}
			};
		case aclFrontActions.ACL_FRONT_ON_REMOVE:
			// eslint-disable-next-line no-case-declarations
			const acl = { ...state.acl }; // clone acl
			for (const key in payload.data) {
				delete acl[key];
			}
			return {
				...state,
				acl: {
					...acl
				}
			};
		default:
			return state;
	}
}
