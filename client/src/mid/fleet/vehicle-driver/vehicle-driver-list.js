import { ApiList } from "../../api";
import { vehicleDriverActions } from "./vehicle-driver-actions";
import { VehicleDriver } from "./vehicle-driver";

const vehicleDriverPath = "fleet/vehicle-drivers";

class VehicleDriverList extends ApiList {}

export const vehicleDriverList = new VehicleDriverList(
  {
    onAdd: vehicleDriverActions.createVehicleDriverFulfilled(),
    onChange: vehicleDriverActions.updateVehicleDriverFulfilled(),
    onLoad: vehicleDriverActions.loadVehicleDriversFulfilled(),
    onRemove: vehicleDriverActions.removeVehicleDriverFulfilled(),
  },
  VehicleDriver,
  vehicleDriverPath
);
