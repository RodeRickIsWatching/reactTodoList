import React from "react";
import { connect } from "react-redux";
import {
  A_changeNowTaskState,
  A_updateNowTask
} from "../../../utils/reducerUtils/actionMap";
import "../../../utils/css/cmpCss/stateBox.css";

class StateBox extends React.Component {
  constructor(props) {
    super();
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps)
  //   return {
  //     nowTaskObj: nextProps.nowTaskObj
  //   }
  // }

  methods = {
    handleCss: taskInfo => {
      let res = "state-box";
      if (taskInfo && Object.keys(taskInfo).length > 0) {
        if (taskInfo.state === "done") {
          res = "state-box done";
        }
      }
      return res;
    }
  };
  render = () => {
    return (
      <div
        className={this.methods.handleCss(
          this.props.taskInfo ? this.props.taskInfo : this.props.nowTaskObj
        )}
        onClick={() => {
          let val = this.props.taskInfo
            ? this.props.taskInfo
            : this.props.nowTaskObj;
          this.props.changeState("ONCHANGE_NOW_TASK_STATE", val);
          // this.props.updateNowTask("UPDATE_NOW_TASK", this.props.taskInfo);
        }}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    nowTaskObj: state.nowTaskObj
  };
};

const mapActionToProps = dispatch => {
  return {
    changeState: (type, val) => {
      dispatch(A_changeNowTaskState(type, val));
    },
    updateNowTask: (type, val) => {
      dispatch(A_updateNowTask(type, val));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(StateBox);
