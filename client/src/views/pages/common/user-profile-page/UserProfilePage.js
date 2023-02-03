/*
    Jono : 18 04 23
    UserProfile : Stateless Functional Component
*/
import React from "react";
// import { List } from 'immutable';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PageHeader from "../../../components/common/page-header";
import UserAvatar from "../../../components/user/user-avatar";

const UserProfilePage = (props) => {
  return (
    <div>
      {" "}
      <PageHeader>user-profile</PageHeader>
      <UserAvatar />
    </div>
  );
};

UserProfilePage.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserProfilePage)
);
