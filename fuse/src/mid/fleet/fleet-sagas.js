import {
	vehicleSagas,
	driverSagas,
	settingSagas,
	fleetTransactionSagas,
	vehicleCcgSagas,
	vehicleDriverSagas
} from './index';

export const fleetSagas = [
	...vehicleSagas,
	...driverSagas,
	...settingSagas,
	...fleetTransactionSagas,
	...vehicleCcgSagas,
	...vehicleDriverSagas
];
