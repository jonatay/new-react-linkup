import { List, Record } from 'immutable';
import { vehicleDriverActions } from './vehicle-driver-actions';

export const VehicleDriverState = new Record({
  filter: {},
  list: new List()
});

export function vehicleDriverReducer(
  state = new VehicleDriverState(),
  { payload, type }
) {
  switch (type) {

    case vehicleDriverActions.SET_FILTER_VEHICLE_DRIVER:
      return state.set("filter", { ...state.filter, ...payload.filter });

    case vehicleDriverActions.CREATE_VEHICLE_DRIVER_FULFILLED:
      return state.set(
        'list',
        state.list.unshift(payload.vehicleDriver)
      );

    case vehicleDriverActions.UPDATE_VEHICLE_DRIVER_FULFILLED:
      return state.set(
        'list',
        state.list.map(r => {
          return r.id === payload.vehicleDriver.id
            ? payload.vehicleDriver
            : r;
        })
      );

    case vehicleDriverActions.REMOVE_VEHICLE_DRIVER_FULFILLED:
      return state.set(
        'list',
        state.list.filter(vehicleDriver => {
          return vehicleDriver.id !== payload.vehicleDriver.id;
        })
      );

    case vehicleDriverActions.LOAD_VEHICLE_DRIVERS_FULFILLED:
      return state.set(
        'list',
        new List(payload.vehicleDrivers)
      );

    default:
      return state;
  }
}
