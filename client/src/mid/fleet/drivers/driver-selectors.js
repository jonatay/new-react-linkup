import { createSelector } from "reselect";

export function getDriversFromState(state) {
  return state.fleet.drivers;
}

export function getDriverFilter(state) {
  return getDriversFromState(state).filter;
}

export function getDriverShowInactive(state) {
  return getDriversFromState(state).showInactive;
}

export function getDriverList(state) {
  return getDriversFromState(state).list;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleDrivers = createSelector(
  getDriverList,
  getDriverFilter,
  (driverList, filter) =>
    driverList
      .filter(
        (driver) =>
          filter.reduce(
            (acc, f) =>
              acc &&
              driver[f.id] &&
              driver[f.id].toLowerCase().includes(f.value.toLowerCase()),
            true
          )
        // driver.name.toLowerCase().includes(filter.toLowerCase())
      )
      .toArray()
);

export const getDriverById = createSelector(getDriverList, (driverList, uid) =>
  driverList.filter((driver) => driver.uid === uid)
);

export const getDriversList = createSelector(
  getDriverList,
  (driverList) => driverList
);
