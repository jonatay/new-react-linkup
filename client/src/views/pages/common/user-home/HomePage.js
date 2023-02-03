/*
    Jono : 18 09 21
    HomePage : Stateless Functional Component
*/
import React from "react";
// import { List } from 'immutable';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PageHeader from "../../../components/common/page-header/PageHeader";
import { authActions } from "../../../../mid/common/auth/index";

const HomePage = ({ signOut }) => {
  return (
    <div>
      <PageHeader>home</PageHeader>
      <h1>react-linkup-new</h1>
      <p>If you can see menu items, navigate away.</p>
      <p>If no menu, you need rights, ask Jono</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

HomePage.propTypes = {
  signOut: PropTypes.func.isRequired,
};

//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signOut: authActions.signOut,
};

export default withRouter(connect(null, mapDispatchToProps)(HomePage));
