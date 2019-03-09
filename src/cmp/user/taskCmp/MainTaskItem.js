import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TaskObj from "./TaskObj";

import {
  A_updateNowTask,
  A_savePrevTask,
  A_addNewTask
} from "../../../utils/reducerUtils/actionMap";

class MainTaskItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ulBox: [],
      nowPathname: props.location.pathname,
      maxHeightBox: {}
    };
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    let res = this.methods.getMaxHeight(nextProps.taskList.data);
    nextState.maxHeightBox = res;
    return true;
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (Object.keys(prevProps.nowTaskObj).length > 0) {
      let prevTaskObj = prevProps.nowTaskObj,
        nextTaskObj = this.props.nowTaskObj;
      if (prevTaskObj.uniqueKey !== nextTaskObj.uniqueKey) {
        this.props.savePrevTask("SAVE_PREV_TASK", prevTaskObj);
        // console.log("切换任务，需要保存");
      }
    }
  };

  methods = {
    getMaxHeight: taskListData => {
      let res = {};
      Object.keys(taskListData).forEach((item, index) => {
        let maxHeight = taskListData[item].length * 38 + "px";
        res[item] = maxHeight;
      });
      return res;
    }
  };
  static getDerivedStateFromProps = (nextProps, prevState) => {
    // if (nextProps.location.pathname !== prevState.nowPathname) {
    //   return {
    //     nowPathname: nextProps.location.pathname,
    //     ulBox: [],
    //     maxHeightBox: []
    //   };
    // }
    return null;
  };

  render = () => {
    if (Object.keys(this.props.taskList).length > 0) {
      return (
        <>
          {}
          <div className="input-container">
            <input
              className="input"
              placeholder="添加任务"
              onKeyDown={e => {
                e.persist();
                let keyCode = e.keyCode;
                if (keyCode === 13) {
                  let title = e.target.value;
                  this.props.addNewTask("ADD_NEW_TASK", { title });
                  e.target.value = "";
                }
              }}
            />
          </div>
          {Object.keys(this.props.taskList.data).map(item => {
            return (
              <div key={item} className="task-info-container" id={item}>
                {this.props.taskList.data[item].length > 0 ? (
                  <div
                    className="state-title"
                    onClick={e => {
                      if (this.state.ulBox.includes(item)) {
                        this.state.ulBox = [
                          ...this.state.ulBox.filter(item2 => {
                            return item !== item2;
                          })
                        ];
                      } else {
                        this.state.ulBox.push(item);
                      }
                      this.setState({
                        ulBox: this.state.ulBox
                      });
                    }}
                  >
                    {item === "todo"
                      ? "今天"
                      : item === "done"
                      ? "已完成"
                      : item === "overdue"
                      ? "已过期"
                      : ""}
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={
                    this.state.ulBox.includes(item)
                      ? "division off"
                      : "division"
                  }
                />
                <ul
                  id="task-title-box"
                  state={item}
                  className={this.state.ulBox.includes(item) ? "on" : ""}
                  style={
                    this.state.ulBox.includes(item)
                      ? { maxHeight: this.state.maxHeightBox[item] }
                      : { maxHeight: 0 }
                  }
                >
                  {this.props.taskList.data[item].map(item2 => {
                    return (
                      <TaskObj
                        taskInfo={item2}
                        key={item2.uniqueKey}
                        taskList={this.props.taskList}
                        updateNowTask={this.props.updateNowTask}
                      />
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </>
      );
    } else {
      return <></>;
    }
  };
}
const mapStateToProps = state => {
  return {
    defaultList: state.defaultList,
    nowTaskObj: state.nowTaskObj
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateNowTask: (type, val) => {
      dispatch(A_updateNowTask(type, val));
    },
    savePrevTask: (type, val) => {
      dispatch(A_savePrevTask(type, val));
    },
    addNewTask: (type, val) => {
      dispatch(A_addNewTask(type, val));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainTaskItem));
