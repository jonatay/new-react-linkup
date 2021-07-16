/*
    Jono : 18 04 06
    FleetDriversPage : Stateless Functional Component
*/
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PageHeader from "../../../components/common/page-header/PageHeader";

import {
  getDriverFilter,
  getVisibleDrivers,
  driverActions,
  vehicleDriverActions,
  getVehicleDrivers,
} from "../../../../mid/fleet";

const FleetDriversPage = (props) => {
  return (
    <div>
      <PageHeader>fleet-drivers</PageHeader>
    </div>
  );
};

FleetDriversPage.propTypes = {
  drivers: PropTypes.instanceOf(Array).isRequired,
  loadDrivers: PropTypes.func.isRequired,
  filterDrivers: PropTypes.func.isRequired,
  updateDriver: PropTypes.func.isRequired,
  updateVehicleDriver: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  drivers: getVisibleDrivers(state),
  driversFilter: getDriverFilter(state),
  vehicleDrivers: getVehicleDrivers(state),
});

const mapDispatchToProps = {
  loadDrivers: driverActions.loadDrivers,
  filterDrivers: driverActions.filterDrivers,
  updateDriver: driverActions.updateDriver,
  updateVehicleDriver: vehicleDriverActions.updateVehicleDriver,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetDriversPage)
);
