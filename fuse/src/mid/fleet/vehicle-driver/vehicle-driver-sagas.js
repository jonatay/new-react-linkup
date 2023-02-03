import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { vehicleDriverActions } from './vehicle-driver-actions';
import { vehicleDriverList } from './vehicle-driver-list';
import { authActions } from '../../common/auth/index';

function* loadAllVehicleDrivers() {
	const vehicleDrivers = yield call([vehicleDriverList, vehicleDriverList.list]);
	yield put(vehicleDriverActions.loadVehicleDriversFulfilled(vehicleDrivers));
}

function* createVehicleDriver({ payload: { vehicleDriver } }) {
	const result = yield call([vehicleDriverList, vehicleDriverList.insert], {
		vehicleDriver
	});
	yield put(vehicleDriverActions.createVehicleDriverFulfilled(result.vehicleDriver));
}

function* updateVehicleDriver({ payload: { id, changes } }) {
	const result = yield call([vehicleDriverList, vehicleDriverList.update], id, {
		changes
	});
	yield put(vehicleDriverActions.updateVehicleDriverFulfilled(result.vehicleDriver));
}

function* removeVehicleDriver({ payload: { vehicleDriver } }) {
	const result = yield call([vehicleDriverList, vehicleDriverList.remove], vehicleDriver.id);
	if (result.status === 'deleted') {
		yield put(vehicleDriverActions.removeVehicleDriverFulfilled(vehicleDriver));
	} else {
		yield put(vehicleDriverActions.removeVehicleDriverFailed(result));
	}
}

// =====================================
//  WATCHERS
// -------------------------------------

function* watchAuthentication() {
	while (true) {
		const { payload } = yield take(authActions.SIGN_IN_FULFILLED);
		vehicleDriverList.token = payload.idToken;
		yield take([authActions.SIGN_OUT_FULFILLED]);
		vehicleDriverList.token = payload.null;
	}
}

function* watchIdTokenRefresh() {
	while (true) {
		const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
		vehicleDriverList.token = payload.idToken;
	}
}

function* watchLoadVehicleDrivers() {
	yield takeEvery(vehicleDriverActions.LOAD_VEHICLE_DRIVERS, loadAllVehicleDrivers);
}

function* watchCreateVehicleDriver() {
	yield takeEvery(vehicleDriverActions.CREATE_VEHICLE_DRIVER, createVehicleDriver);
}

function* watchUpdateVehicleDriver() {
	yield takeEvery(vehicleDriverActions.UPDATE_VEHICLE_DRIVER, updateVehicleDriver);
}

function* watchRemoveVehicleDriver() {
	yield takeEvery(vehicleDriverActions.REMOVE_VEHICLE_DRIVER, removeVehicleDriver);
}

export const vehicleDriverSagas = [
	fork(watchAuthentication),
	fork(watchIdTokenRefresh),
	fork(watchLoadVehicleDrivers),
	fork(watchUpdateVehicleDriver),
	fork(watchCreateVehicleDriver),
	fork(watchRemoveVehicleDriver)
];
