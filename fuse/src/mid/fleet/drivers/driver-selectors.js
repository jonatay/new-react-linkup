import { createSelector } from 'reselect';

export function getDrivers(state) {
	return state.drivers;
}

export function getDriverFilter(state) {
	return getDrivers(state).filter;
}

export function getDriverList(state) {
	return getDrivers(state.fleet).list;
}

// =====================================
//  MEMOIZED SELECTORS
// -------------------------------------

export const getVisibleDrivers = createSelector(getDriverList, getDriverFilter, (driverList, filter) =>
	driverList.filter(driver => driver.name.toLowercase().includes(filter.toLowerCase()))
);

export const getDriverById = createSelector(getDriverList, (driverList, uid) =>
	driverList.filter(driver => driver.uid === uid)
);

export const getDriversList = createSelector(getDriverList, driverList => driverList);
