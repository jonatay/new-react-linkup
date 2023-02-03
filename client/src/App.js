import "./App.css";
import React, { Suspense } from "react";
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
  getPhotoURL,
  isAuthenticated,
  navActions,
  getAclFront,
  getCurrentLocation,
} from "./mid/common";

import { Layout } from "antd";
import ErrorBoundary from "./views/components/common/error-boundry";
const { Content } = Layout;

const App = ({
  authenticated,
  signOut,
  photoURL,
  navigateTo,
  aclFront,
  currentNavPath,
  location,
}) => {
  if (!authenticated)
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Content>
            <Switch>
              {serviceRoutes.map((route, idx) => (
                <RequireUnauthRoute
                  key={idx}
                  path={route.path}
                  component={route.component}
                  {...authenticated}
                />
              ))}
              <Redirect
                to={{
                  pathname: "/sign-in",
                  state: { from: location },
                }}
              />
            </Switch>
          </Content>
        </Layout>
      </Suspense>
    );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout style={{ height: "inherit" }}>
        <AppHeader
          authenticated={authenticated}
          signOut={signOut}
          photoURL={photoURL}
          navigateTo={navigateTo}
          aclFront={aclFront}
          currentNavPath={currentNavPath}
        />

        <Content style={{ padding: "0 10px", marginTop: 60 }}>
          <div style={{ background: "#fff", padding: 5 }}>
            <Switch>
              <ErrorBoundary>
                {privateRoutes.map((route, idx) => (
                  <RequireAuthRoute
                    key={idx}
                    exact
                    path={route.path}
                    component={route.component}
                    authenticated={authenticated}
                  />
                ))}
              </ErrorBoundary>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Suspense>
  );
};

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  photoURL: PropTypes.string,
  navigateTo: PropTypes.func.isRequired,
  currentNavPath: PropTypes.string.isRequired,
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = (state) => ({
  photoURL: getPhotoURL(state),
  authenticated: isAuthenticated(state),
  aclFront: getAclFront(state),
  currentNavPath: getCurrentLocation(state),
});

const mapDispatchToProps = {
  signOut: authActions.signOut,
  navigateTo: navActions.navigateTo,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
