import React from "react";
import Textarea from "./Textarea";
import TopMenu from "./TopMenu";
import BottomMenu from "./BottomMenu";

class EditCmp extends React.Component {
  constructor(props) {
    super();
  }
  // static getDerivedStateFromProps = (nextProps, prevState) => {
  //   return {
  //     textareaInfo: nextProps.textareaInfo
  //   };
  // };

  render = () => {
    return (
      <>
        <div className="top-menu-container clearfix">
          <TopMenu />
        </div>
        <div className="textarea-container">
          <Textarea
            updateTaskInfo={this.props.updateTaskInfo}
            taskContent={this.props.taskContent}
            taskTitle={this.props.taskTitle}
          />
        </div>
        <div className="bottom-menu-container">
          <BottomMenu />
        </div>
      </>
    );
  };
}


export default EditCmp
