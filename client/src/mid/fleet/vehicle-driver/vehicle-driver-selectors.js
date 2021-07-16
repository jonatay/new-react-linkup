import { createSelector } from 'reselect';

export const getVehicleDriversRoot = state => {
  return state.fleet.vehicleDrivers;
};

export const getVehicleDriverList = state => {
  return getVehicleDriversRoot(state).list;
};

export const getVehicleDriverFilter = state => {
  return getVehicleDriversRoot(state).filter;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVehicleDriverById = createSelector(
  getVehicleDriverList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getVehicleDrivers = createSelector(
  getVehicleDriverList,
  list => list.toArray()
);


export const getFilteredVehicleDrivers = createSelector(
  getVehicleDrivers,
  getVehicleDriverFilter,
  (vehicleDrivers, filter) => vehicleDrivers //add .filter here
);
