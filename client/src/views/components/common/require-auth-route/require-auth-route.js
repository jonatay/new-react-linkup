import React from "react";
import { Route, Redirect } from "react-router-dom";
import ErrorBoundary from "../error-boundry";

// Check if authenticated, else sign-in
const RequireAuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return authenticated ? (
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
      ) : (
        <Redirect
          to={{
            pathname: "/sign-in",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

export default RequireAuthRoute;
