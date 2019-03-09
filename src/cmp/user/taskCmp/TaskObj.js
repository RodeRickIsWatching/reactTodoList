import React from "react";
import StateBox from "../stateBoxCmp/StateBox";

class TaskObj extends React.Component {
  render = () => {
    return (
      <>
        <li
          onClick={() => {
            this.props.updateNowTask("UPDATE_NOW_TASK", this.props.taskInfo);
          }}
        >
          <StateBox taskInfo={this.props.taskInfo} />
          <div className="taskList-info">
            <span className="title-info">{this.props.taskInfo.title}</span>
            <span className="date-info">
              {this.props.taskList.key === "today" ||
              +new Date() - this.props.taskInfo.date < 86400000
                ? "今天"
                : `${new Date(this.props.taskInfo.date).getMonth() +
                    1}月${new Date(this.props.taskInfo.date).getDate()}日`}
            </span>
          </div>
        </li>
      </>
    );
  };
}

export default TaskObj;
