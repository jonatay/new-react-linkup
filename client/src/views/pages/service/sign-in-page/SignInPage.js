import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { authActions, getAuthError } from "../../../../mid/common/auth";
import { LoginForm } from "../../../components/common/login-form";

import { notification, Button, Row, Col } from "antd";
import {
  GithubOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import "./sign-in-page.css";

const openNotification = (authError) => {
  notification["error"]({
    message: authError.code,
    description: JSON.stringify(authError),
    duration: 10,
    style: {
      width: 600,
      marginLeft: 335 - 600,
    },
  });
};

const SignInPage = ({
  authError,
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
  signInWithFacebook,
  signInWithEmailAndPassword,
}) => {
  return (
    <Row justify="center" align="top">
      {authError === null ? "" : openNotification(authError)}
      <h1 className="sign-in__heading">Sign in</h1>
      <Row type="flex" justify="center" align="top">
        <Col span={6}>
          <LoginForm signInSubmit={signInWithEmailAndPassword} />
        </Col>
        <Col span={6} style={{ paddingLeft: 30, paddingRight: 30 }}>
          <Button
            className="sign-in__button"
            icon={<GithubOutlined />}
            onClick={signInWithGithub}
          >
            GitHub
          </Button>
          <Button
            className="sign-in__button"
            icon={<GoogleOutlined />}
            onClick={signInWithGoogle}
          >
            Google
          </Button>
          <Button
            className="sign-in__button"
            icon={<TwitterOutlined />}
            onClick={signInWithTwitter}
          >
            Twitter
          </Button>
          <Button
            className="sign-in__button"
            icon={<FacebookOutlined />}
            disabled
            // onClick={signInWithFacebook}
          >
            Facebook
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

SignInPage.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
  signInWithEmailAndPassword: PropTypes.func.isRequired,
  authError: PropTypes.object,
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = (state) => ({
  authError: getAuthError(state),
});

const mapDispatchToProps = {
  signInWithGithub: authActions.signInWithGithub,
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithTwitter: authActions.signInWithTwitter,
  signInWithFacebook: authActions.signInWithFacebook,
  signInWithEmailAndPassword: authActions.signInWithEmailPassword,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignInPage)
);
