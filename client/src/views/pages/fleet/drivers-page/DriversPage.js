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

import { spEmployeeActions, getSpEmployees } from "../../../../mid/simple-pay";

import DriverGrid from "../../../components/fleet/driver-grid";

const FleetDriversPage = class FleetDriversPage extends React.Component {
  state = {
    editVehicles: [],
    activeKey: "vehicles",
  };

  componentDidMount() {
    this.props.loadDrivers();
    this.props.loadSpEmployees();
  }

  render() {
    return (
      <div>
        <PageHeader>fleet-drivers</PageHeader>
        <DriverGrid {...this.props} />
      </div>
    );
  }
};

FleetDriversPage.propTypes = {
  drivers: PropTypes.instanceOf(Array).isRequired,
  loadDrivers: PropTypes.func.isRequired,
  filterDrivers: PropTypes.func.isRequired,
  updateDriver: PropTypes.func.isRequired,
  removeDriver: PropTypes.func.isRequired,
  updateVehicleDriver: PropTypes.func.isRequired,
  spEmployees: PropTypes.instanceOf(Array).isRequired,
  loadSpEmployees: PropTypes.func.isRequired,
  updateSpEmployee: PropTypes.func.isRequired,
  vehicleDrivers: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  drivers: getVisibleDrivers(state),
  driversFilter: getDriverFilter(state),
  vehicleDrivers: getVehicleDrivers(state),
  spEmployees: getSpEmployees(state),
});

const mapDispatchToProps = {
  loadDrivers: driverActions.loadDrivers,
  filterDrivers: driverActions.filterDrivers,
  updateDriver: driverActions.updateDriver,
  removeDriver: driverActions.removeDriver,
  updateVehicleDriver: vehicleDriverActions.updateVehicleDriver,
  loadSpEmployees: spEmployeeActions.loadSpEmployees,
  updateSpEmployee: spEmployeeActions.updateSpEmployee,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FleetDriversPage)
);
