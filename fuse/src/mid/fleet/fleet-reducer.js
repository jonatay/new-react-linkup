import { combineReducers } from 'redux';
import {
	vehicleReducer,
	driverReducer,
	settingReducer,
	fleetTransactionReducer,
	vehicleCcgReducer,
	vehicleDriverReducer
} from './index';

export const fleetReducer = combineReducers({
	vehicles: vehicleReducer,
	vehicleCcgs: vehicleCcgReducer,
	drivers: driverReducer,
	fleetTransactions: fleetTransactionReducer,
	settings: settingReducer,
	vehicleDrivers: vehicleDriverReducer
});
