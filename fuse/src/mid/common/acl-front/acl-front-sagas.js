import { call, take, put, fork, cancel } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { authActions } from '../auth/index';
import { aclFrontData } from './acl-front-data';
import { aclFrontActions } from './acl-front-actions';

function subscribeToAcl() {
	return eventChannel(emit => aclFrontData.subscribe(emit));
}

function* readFromAcl() {
	const channel = yield call(subscribeToAcl);
	while (true) {
		const action = yield take(channel);
		yield put(action);
	}
}

// =====================================
//  WATCHERS
// -------------------------------------

function* watchAuthentication() {
	while (true) {
		const { payload } = yield take(authActions.SIGN_IN_FULFILLED);
		// console.log(payload);

		yield put(aclFrontActions.aclOnSetUid(payload.authUser.uid));
		const job = yield fork(readFromAcl);
		yield take([authActions.SIGN_OUT_FULFILLED]);
		yield put(aclFrontActions.aclOnSetUid(null));
		yield cancel(job);
	}
}

// =====================================
//  ACL SAGAS
// -------------------------------------
export const aclFrontSagas = [fork(watchAuthentication)];
