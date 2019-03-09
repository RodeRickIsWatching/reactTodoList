import React from "react";
import { Link, Route } from "react-router-dom";
import "../utils/css/viewCss/login.css";

class Login extends React.Component {
  account = React.createRef();
  password = React.createRef();
  methods = {
    onActive: e => {
      if (this.state.once) {
        this.setState({
          clickItem: e.target,
          once: false
        });
      }
      document.onclick = e => {
        this.setState({
          clickItem: e.target
        });
      };
    },
    submitLogin: (e, params) => {
      if (this.state.id === "admin" && this.state.password === "000000") {
        params.history.push("/user/admin/all");
      } else {
        console.log(this.state.password);
        alert("信息错误");
      }
    }
  };
  state = {
    thirdPartyLink:
      "cdn-dida365-com.alikunlun.com/static/build/sign/sign-icons.3bd6463b0667e3323742af44d54d49ff.png",
    thirdPartyArr: ["weibo", "weixin", "QQ"],
    clickItem: "",
    once: true,
    id: "",
    password: "",
    showPassword: ""
  };

  render = () => {
    return (
      <div
        className="container"
        onClick={e => {
          this.methods.onActive(e);
        }}
      >
        <div className="logo-container">
          <i className="icon" />
        </div>
        <div className="login-section">
          <div className="login-form">
            <div
              className={`row-item account-container under-line ${
                this.state.clickItem === this.account.current ? "active" : ""
              }`}
            >
              <span className="row-icon-container">
                <i className="icon account-icon" />
              </span>
              <input
                placeholder="邮箱"
                ref={this.account}
                value={this.state.id}
                onChange={e => {
                  this.setState({
                    id: e.target.value
                  });
                }}
                onFocus={e => {
                  this.setState({
                    clickItem: e.target
                  });
                }}
              />
            </div>
            <div
              className={`row-item password-container under-line ${
                this.state.clickItem === this.password.current ? "active" : ""
              }`}
            >
              <span className="row-icon-container">
                <i className="icon password-icon" />
              </span>
              <input
                placeholder="密码"
                password
                ref={this.password}
                value={this.state.password.replace(/[\s\S]/g, "*")}
                onChange={e => {
                  let val = e.target.value;
                  this.setState({
                    password: val
                  });
                }}
                onFocus={e => {
                  this.setState({
                    clickItem: e.target
                  });
                }}
              />
            </div>
            <div className="row-item submit-container">
              <Route
                render={params => {
                  return (
                    <button
                      type="button"
                      onClick={e => {
                        this.methods.submitLogin(e, params);
                      }}
                    >
                      登录
                    </button>
                  );
                }}
              />
            </div>
            <div className="row-item forget-password-container">
              <Link to="/login">忘记密码</Link>
            </div>
          </div>
          <div className="third-party-container">
            <div className="sub-title horizontal-line">使用第三方账户登录</div>
            <ul>
              {this.state.thirdPartyArr.map(item => {
                return (
                  <li key={item} className="icon-container">
                    <Link to="/login">
                      <i className={`icon icon_${item}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
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
