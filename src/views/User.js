import React from "react";
import { NavLeft, TaskList, Edit } from "../srcMap";
import "../utils/css/viewCss/user.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  A_renderDefaultTaskList,
  A_updateTaskInfo,
  A_rerenderTaskList
} from "../utils/reducerUtils/actionMap";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.props.renderDefaultTaskList("RENDER_DEFAULT_TASK_LIST", "1");
  }

  state = {
    navLeft: {
      mainNav: [
        {
          key: "all",
          name: "所有",
          count: 3
        },
        {
          key: "today",
          name: "今天",
          count: 1
        },
        {
          key: "week",
          name: "最近7天",
          count: 2
        }
      ],
      subNav: [
        // {
        //   key: "done",
        //   name: "已完成"
        // },
        // {
        //   key: "dust",
        //   name: "垃圾箱"
        // }
      ],
      avatarSrc:
        "https://profile-photo.s3.cn-north-1.amazonaws.com.cn/files/avatar/50686/MTAxMzcyMzE1NjNrZTBmYTZ1/avatar.png?v=6b0490d1b7c472496ff7f427f0e0b969"
    },
    navItem: "",
    taskList: {}
  };

  componentDidMount = () => {
    this.methods.updateNowNav(this.props.router.match.params.navList);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    // 该生命周期两个参数，下一个状态的prop和更新前的state
    this.methods.updateTaskListTitleAndInfo(nextProps);
    this.methods.updateNowNav(
      nextProps.router.match.params.navList,
      nextProps.defaultList
    );
    let len = nextProps.length;
    let nowTaskList = this.props.defaultList;
    let nextTaskList = nextProps.defaultList;
    for (let i = 0; i < len; i++) {
      if (
        nowTaskList[i] &&
        nowTaskList[i].state === nextTaskList[i].state &&
        nowTaskList[i].title === nextTaskList[i].title &&
        nowTaskList[i].content === nextTaskList[i].content
      ) {
        return false;
      }
    }
    return true;
  };

  methods = {
    updateTaskListTitleAndInfo: nextProp => {
      // 连接edit中的task的title和taskList中task的title
      // 并且连接testarea的info
      let nowTaskObj = nextProp.nowTaskObj,
        taskList = this.state.taskList;
      if (
        nowTaskObj &&
        Object.keys(nowTaskObj).length > 0 &&
        taskList.data[nowTaskObj.state].length > 0
      ) {
        let res = nextProp.defaultList.find(item => {
          return item.uniqueKey == nowTaskObj.uniqueKey;
        });
        res.title = nowTaskObj.title;
      }
    },
    updateNowNav: (navItem, taskList = this.props.defaultList) => {
      let res = this.methods.findTaskByNav(navItem.toLowerCase(), taskList);
      this.state.taskList = res;
      this.state.navItem = navItem;
    },

    findTaskByNav: (navItem, taskList) => {
      switch (navItem) {
        case "today":
          var temp = taskList.filter(
            item => +new Date() - item.date < 86400000
          );
          return {
            name: "今天",
            key: "today",
            data: {
              done: temp.filter(item => item.state === "done"),
              todo: temp.filter(item => item.state === "todo"),
              overdue: temp.filter(item => item.state === "overdue")
            }
          };
        case "week":
          var temp = taskList.filter(
            item => +new Date() - item.date < 86400000 * 7
          );
          return {
            name: "最近7天",
            key: "week",
            data: {
              done: temp.filter(item => item.state === "done"),
              todo: temp.filter(item => item.state === "todo"),
              overdue: temp.filter(item => item.state === "overdue")
            }
          };
        case "done":
          return {
            name: "已完成",
            key: "done",
            data: taskList.filter(item => item.state === "done")
          };
        case "dust":
          return {
            name: "垃圾箱",
            key: "dust",
            data: taskList.filter(item => item.state === "dust")
          };
        default:
          var temp = taskList;
          return {
            name: "所有",
            key: "all",
            data: {
              done: temp.filter(item => item.state === "done"),
              todo: temp.filter(item => item.state === "todo"),
              overdue: temp.filter(item => item.state === "overdue")
            }
          };
      }
    }
  };
  render = () => {
    return (
      <div
        className="user-container"
        // onClick={this.methods.saveAndUpdateIndexDB}
      >
        <nav className="nav-container">
          <Route>
            <NavLeft
              mainNav={this.state.navLeft.mainNav}
              subNav={this.state.navLeft.subNav}
              avatarSrc={this.state.navLeft.avatarSrc}
              updateNowNav={this.methods.updateNowNav}
              navItem={this.state.navItem}
            />
          </Route>
        </nav>
        <div className="task-title-container">
          <TaskList taskList={this.state.taskList} />
        </div>
        <section className="text-container">
          <Edit
            ifChoosedTask={Object.keys(this.props.nowTaskObj).length > 0}
            taskTitle={this.props.nowTaskObj.title}
            taskContent={this.props.nowTaskObj.content}
            updateTaskInfo={this.props.updateTaskInfo}
          />
        </section>
      </div>
    );
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
    renderDefaultTaskList: (type, val) => {
      dispatch(A_renderDefaultTaskList(type, val));
    },
    updateTaskInfo: (type, val) => {
      dispatch(A_updateTaskInfo(type, val));
    },
    rerenderTaskList: type => {
      dispatch(A_rerenderTaskList);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
