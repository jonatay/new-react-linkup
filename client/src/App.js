import "./App.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import { privateRoutes, serviceRoutes } from "./routes";
import RequireAuthRoute from "./views/components/common/require-auth-route";
import RequireUnauthRoute from "./views/components/common/require-unauth-route";

import NoMatch from "./views/pages/common/no-match";
import AppHeader from "./views/components/common/app-header";

import {
  authActions,
  isAuthenticated,
  navActions,
  getAclFront,
  getCurrentLocation,
} from "./mid/common";

import { Button, Layout } from "antd";
const { Content } = Layout;

const App = () => (
  <div className="App">
    <Layout>
      <Content>
        <Button type="primary">Button</Button>
      </Content>
    </Layout>
  </div>
);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  currentNavPath: PropTypes.string.isRequired,
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = (state) => ({
  authenticated: isAuthenticated(state),
  aclFront: getAclFront(state),
  currentNavPath: getCurrentLocation(state),
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  navigateTo: navActions.navigateTo,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
