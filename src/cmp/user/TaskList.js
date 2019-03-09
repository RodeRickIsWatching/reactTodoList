import React from "react";
import "../../utils/css/cmpCss/taskList.css";
import MainTaskItem from "./taskCmp/MainTaskItem";
import SubTaskItem from "./taskCmp/SubTaskItem";

class TaskList extends React.Component {
  state = {
    nowTask: ""
  };
  methods = {
    updateNowTask: _task => {
      console.log(_task);
      this.setState({
        nowTask: _task
      });
    },
    changeClickBox: () => {}
  };

  render = () => {
    return (
      <>
        <div className="nav-title-container">
          <span>{this.props.taskList.name}</span>
        </div>
        <div className="task-container">
          {this.props.taskList.key !== "dust" &&
          this.props.taskList.key !== "done" ? (
            <MainTaskItem
              taskList={this.props.taskList}
              nowTask={this.state.nowTask}
              updateNowTask={this.methods.updateNowTask}
            />
          ) : (
            <SubTaskItem
              taskList={this.props.taskList}
              nowTask={this.state.nowTask}
              updateNowTask={this.methods.updateNowTask}
            />
          )}
        </div>
      </>
    );
  };
}

export default TaskList;
