import React from "react";
function getTimeStringType(_date) {
  let dayArr = ["日", "一", "二", "三", "四", "五", "六"];

  return `${new Date(_date).getMonth() + 1}月${new Date(_date).getDate()}日 周${
    dayArr[new Date(_date).getDay()]
  }`;
}
class SubTaskItem extends React.Component {
  state = {
    ulBox: []
  };
  render = () => {
    return (
      <>
        {Object.keys(this.props.taskList.data).map(item => {
          return (
            <div
              className="task-info-container"
              onClick={e => {
                let target = e.currentTarget.children[2];
                let maxHeight = `${target.children.length * 38 + 10}px`;
                if (target.className !== "on") {
                  target.style.maxHeight = maxHeight;
                } else {
                  target.style.maxHeight = 0;
                }
              }}
            >
              <div
                className="state-title"
                key={this.props.taskList.data[item].date}
                onClick={() => {
                  let key = this.props.taskList.data[item].date;
                  if (this.state.ulBox.includes(key)) {
                    this.state.ulBox = [
                      ...this.state.ulBox.filter(item2 => {
                        return key !== item2;
                      })
                    ];
                  } else {
                    this.state.ulBox.push(key);
                  }
                  this.setState({
                    ulBox: this.state.ulBox
                  });
                }}
              >
                {getTimeStringType(this.props.taskList.data[item].date)}
              </div>
              <div
                className={
                  this.state.ulBox.includes(this.props.taskList.data[item].date)
                    ? "division off"
                    : "division"
                }
              />
              <ul
                className={
                  this.state.ulBox.includes(this.props.taskList.data[item].date)
                    ? "on"
                    : ""
                }
              >
                {this.props.taskList.data.map(item2 => {
                  return (
                    <li key={item2.title + item2.date}>
                      <div
                        className={
                          this.props.taskList.key === "dust"
                            ? "click-box disable"
                            : "click-box"
                        }
                      />
                      <div className="taskList-info">
                        <span className="title-info">{item2.title}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </>
    );
  };
}
export default SubTaskItem;
