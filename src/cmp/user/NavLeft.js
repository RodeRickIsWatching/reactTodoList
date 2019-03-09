import React from "react";
import "../../utils/css/cmpCss/navLeft.css";
import NavList from "./navCmp/NavList";

class NavLeft extends React.Component {
  constructor(props){
    super()
    console.log(props)
  }


  render = () => {
    return (
      <>
        <div className="user-info-container">
          <div className="avatar-container">
            <img alt="" src={this.props.avatarSrc} />
          </div>
          <span className="id">admin</span>
        </div>
        <div className="nav-list-container">
          <NavList
            navList={this.props.mainNav}
            findTaskByIndex={this.props.updateNowNav}
            navItem={this.props.navItem}
          />
          <NavList
            navList={this.props.subNav}
            findTaskByIndex={this.props.updateNowNav}
            navItem={this.props.navItem}
          />
        </div>
      </>
    );
  };
}

export default NavLeft;
