import React from "react";
import "../utils/css/login.css"

class Login extends React.Component {
  render = () => {
    return (
      <div className="container">
        <div className="logo-container">
            <i className="logo"></i>
        </div>
        <div className="register-section">
            <div className="login-container">登录</div>
            <div className="third-party-container">
              <div className="sub-title horizontal-line">使用第三方账户登录</div>
            </div>
            <div className="other-link">
              <a href="#">创建免费账户</a>
            </div>
        </div>
      </div>
    );
  };
}

export default Login;
