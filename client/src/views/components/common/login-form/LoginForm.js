import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";

// const FormItem = Form.Item;

class LoginForm extends React.Component {
  onFinish = ({ email, password }) => {
    this.props.signInSubmit(email, password);
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <Form onFinish={this.onFinish} className="login-form">
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="forgot">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="register">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;
//
// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
