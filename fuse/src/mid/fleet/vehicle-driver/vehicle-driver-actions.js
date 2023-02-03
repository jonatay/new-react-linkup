export const vehicleDriverActions = {
	SET_FILTER_VEHICLE_DRIVER: 'FLEETSET_FILTER_VEHICLE_DRIVERS',

	LOAD_VEHICLE_DRIVERS: 'FLEET_LOAD_VEHICLE_DRIVERS',
	LOAD_VEHICLE_DRIVERS_FULFILLED: 'FLEET_LOAD_VEHICLE_DRIVERS_FULFILLED',
	LOAD_VEHICLE_DRIVERS_FAILED: 'FLEET_LOAD_VEHICLE_DRIVERS_FAILED',

	CREATE_VEHICLE_DRIVER: 'FLEET_CREATE_VEHICLE_DRIVER',
	CREATE_VEHICLE_DRIVER_FAILED: 'FLEET_CREATE_VEHICLE_DRIVER_FAILED',
	CREATE_VEHICLE_DRIVER_FULFILLED: 'FLEET_CREATE_VEHICLE_DRIVER_FULFILLED',

	REMOVE_VEHICLE_DRIVER: 'FLEET_REMOVE_VEHICLE_DRIVER',
	REMOVE_VEHICLE_DRIVER_FAILED: 'FLEET_REMOVE_VEHICLE_DRIVER_FAILED',
	REMOVE_VEHICLE_DRIVER_FULFILLED: 'FLEET_REMOVE_VEHICLE_DRIVER_FULFILLED',

	UPDATE_VEHICLE_DRIVER: 'FLEET_UPDATE_VEHICLE_DRIVER',
	UPDATE_VEHICLE_DRIVER_FAILED: 'FLEET_UPDATE_VEHICLE_DRIVER_FAILED',
	UPDATE_VEHICLE_DRIVER_FULFILLED: 'FLEET_UPDATE_VEHICLE_DRIVER_FULFILLED',

	setFilterVehicleDriver: filter => ({
		type: vehicleDriverActions.SET_FILTER_VEHICLE_DRIVER,
		payload: { filter }
	}),

	loadVehicleDrivers: () => ({
		type: vehicleDriverActions.LOAD_VEHICLE_DRIVERS
	}),
	loadVehicleDriversFulfilled: vehicleDrivers => ({
		type: vehicleDriverActions.LOAD_VEHICLE_DRIVERS_FULFILLED,
		payload: { vehicleDrivers }
	}),

	loadVehicleDriversFailed: error => ({
		type: vehicleDriverActions.LOAD_VEHICLE_DRIVERS_FAILED,
		payload: { error }
	}),

	createVehicleDriver: vehicleDriver => ({
		type: vehicleDriverActions.CREATE_VEHICLE_DRIVER,
		payload: { vehicleDriver }
	}),

	createVehicleDriverFailed: error => ({
		type: vehicleDriverActions.CREATE_VEHICLE_DRIVER_FAILED,
		payload: { error }
	}),

	createVehicleDriverFulfilled: vehicleDriver => ({
		type: vehicleDriverActions.CREATE_VEHICLE_DRIVER_FULFILLED,
		payload: { vehicleDriver }
	}),

	removeVehicleDriver: vehicleDriver => ({
		type: vehicleDriverActions.REMOVE_VEHICLE_DRIVER,
		payload: { vehicleDriver }
	}),

	removeVehicleDriverFailed: error => ({
		type: vehicleDriverActions.REMOVE_VEHICLE_DRIVER_FAILED,
		payload: { error }
	}),

	removeVehicleDriverFulfilled: vehicleDriver => ({
		type: vehicleDriverActions.REMOVE_VEHICLE_DRIVER_FULFILLED,
		payload: { vehicleDriver }
	}),

	updateVehicleDriver: (id, changes) => ({
		type: vehicleDriverActions.UPDATE_VEHICLE_DRIVER,
		payload: { id, changes }
	}),

	updateVehicleDriverFailed: error => ({
		type: vehicleDriverActions.UPDATE_VEHICLE_DRIVER_FAILED,
		payload: { error }
	}),

	updateVehicleDriverFulfilled: vehicleDriver => ({
		type: vehicleDriverActions.UPDATE_VEHICLE_DRIVER_FULFILLED,
		payload: { vehicleDriver }
	})
};
