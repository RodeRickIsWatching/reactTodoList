import React from "react";

function Textarea(props) {
  return (
    <div className="textarea-box">
      <div className="textarea-title">
        <input className="task-title"
          value={props.taskTitle ? props.taskTitle : ""}
          onChange={e => {
            props.updateTaskInfo("ONCHANGE_TASKTITLE", e.target.value);
          }}
        />
      </div>
      <textarea
        className="textarea"
        onChange={e => {
          props.updateTaskInfo("ONCHANGE_CONTENT", e.target.value);
        }}
        placeholder="描述"
        value={props.taskContent ? props.taskContent : ""}
      />
    </div>
  );
}
export default Textarea;
