import React from "react";
import "../../utils/css/cmpCss/edit.css";
import EditCmp from "./editCmp";

class Edit extends React.Component {
  state = {
    noChooseTask: "点击任务标题查看详情"
  };
  render = () => {
    return (
      <div className="detail-container">
        <div
          className="empty-detail"
          style={{
            display: this.props.ifChoosedTask ? "none" : "inline-block"
          }}
        >
          <span>{this.state.noChooseTask}</span>
        </div>
        <div
          className="has-detail-container"
          style={{
            display: !this.props.ifChoosedTask ? "none" : "inline-block"
          }}
        >
          <EditCmp
            taskTitle={this.props.taskTitle}
            taskContent={this.props.taskContent}
            updateTaskInfo={this.props.updateTaskInfo}
          />
        </div>
      </div>
    );
  };
}

export default Edit;
