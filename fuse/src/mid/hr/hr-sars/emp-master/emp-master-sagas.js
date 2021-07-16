import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { empMasterActions, empDetailActions, empCodeActions } from '..';
import { empMasterList } from './emp-master-list';
import { authActions } from '../../../common/auth';

function* loadAllEmpMasters() {
	const { empMasters } = yield call([empMasterList, empMasterList.list]);
	// console.log(empMasters);
	yield put(empMasterActions.loadEmpMastersFulfilled(empMasters));
}

function* loadAllCubitCompanies() {
	// console.log('loadAllCubitCompanies');
	const { cubitCompanies } = yield call([empMasterList, empMasterList.listCubitCompanies]);
	// console.log(cubitCompanies);
	yield put(empMasterActions.loadCubitCompaniesFulfilled(cubitCompanies));
}

function* createEmpMaster({ payload: { data } }) {
	const { error, empMaster, empDetails, empCodes } = yield call([empMasterList, empMasterList.insert], {
		data
	});
	if (!error) {
		yield put(empMasterActions.createEmpMasterFulfilled(empMaster));
		if (empDetails) {
			yield put(empDetailActions.importEmpDetailsFulfilled(empDetails));
		}
		if (empCodes) {
			yield put(empCodeActions.importEmpCodesFulfilled(empCodes));
		}
	} else {
		console.log(error);
		yield put(empMasterActions.createEmpMasterFailed(error));
	}
}

function* updateEmpMaster({ payload: { id, changes } }) {
	const result = yield call([empMasterList, empMasterList.update], id, {
		changes
	});
	yield put(empMasterActions.updateEmpMasterFulfilled(result.empMaster));
}

function* removeEmpMaster({ payload: { empMaster } }) {
	const result = yield call([empMasterList, empMasterList.remove], empMaster.id);
	if (result.status === 'deleted') {
		yield put(empMasterActions.removeEmpMasterFulfilled(empMaster));
	} else {
		yield put(empMasterActions.removeEmpMasterFailed(result));
	}
}

function* importEmpMaster({ payload: { data } }) {
	const { empMaster, empDetails, empCodes } = yield call([empMasterList, empMasterList.importEmpMaster], { data });
	yield put(empMasterActions.importEmpMasterFulfilled(empMaster));
	yield put(empDetailActions.importEmpDetailsFulfilled(empDetails));
	yield put(empCodeActions.importEmpCodesFulfilled(empCodes));
}

function* downloadEmp501({ payload: { data, filename, type } }) {
	const file = new Blob([data], { type });
	if (window.navigator.msSaveOrOpenBlob)
		// IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else {
		// Others
		const a = document.createElement('a');
		const url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		yield setTimeout(() => {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

function* requestEmp501TextDownload({ payload: { id } }) {
	const { data, filename, type } = yield call([empMasterList, empMasterList.requestEmp501TextDownload], id);
	console.log(data, filename, type);
	yield put(empMasterActions.downloadEmp501(data, filename, type));
	// yield put(empMasterActions.updateEmpMasterFulfilled(result.empMaster));
}

// =====================================
//  WATCHERS
// -------------------------------------

function* watchAuthentication() {
	while (true) {
		const { payload } = yield take(authActions.SIGN_IN_FULFILLED);
		empMasterList.token = payload.idToken;
		yield take([authActions.SIGN_OUT_FULFILLED]);
		empMasterList.token = payload.null;
	}
}

function* watchIdTokenRefresh() {
	while (true) {
		const { payload } = yield take(authActions.REFRESH_ID_TOKEN_FULFILLED);
		empMasterList.token = payload.idToken;
	}
}

function* watchLoadEmpMasters() {
	yield takeEvery(empMasterActions.LOAD_EMP_MASTERS, loadAllEmpMasters);
}

function* watchLoadCubitCompanies() {
	yield takeEvery(empMasterActions.LOAD_CUBIT_COMPANIES, loadAllCubitCompanies);
}

function* watchCreateEmpMaster() {
	yield takeEvery(empMasterActions.CREATE_EMP_MASTER, createEmpMaster);
}

function* watchUpdateEmpMaster() {
	yield takeEvery(empMasterActions.UPDATE_EMP_MASTER, updateEmpMaster);
}

function* watchRemoveEmpMaster() {
	yield takeEvery(empMasterActions.REMOVE_EMP_MASTER, removeEmpMaster);
}

function* watchImportEmpMaster() {
	yield takeEvery(empMasterActions.IMPORT_EMP_MASTER, importEmpMaster);
}

function* watchDownloadEmp501() {
	yield takeEvery(empMasterActions.DOWNLOAD_EMP_501, downloadEmp501);
}

function* watchRequestEmp501TextDownload() {
	yield takeEvery(empMasterActions.REQUEST_EMP_501_TEXT_DOWNLOAD, requestEmp501TextDownload);
}

export const empMasterSagas = [
	fork(watchAuthentication),
	fork(watchIdTokenRefresh),
	fork(watchLoadEmpMasters),
	fork(watchUpdateEmpMaster),
	fork(watchCreateEmpMaster),
	fork(watchRemoveEmpMaster),
	fork(watchImportEmpMaster),
	fork(watchLoadCubitCompanies),
	fork(watchDownloadEmp501),
	fork(watchRequestEmp501TextDownload)
];
