import indexedDBController from "../indexedDBController";
import renderUniqueKey from "../renderUniqueKey";
let defaultData = [
  {
    uniqueKey: "00000000",
    state: "todo",
    title: "test1",
    date: +new Date(),
    content: "testtest"
  },
  {
    uniqueKey: "00000001",
    state: "todo",
    title: "test2",
    date: +new Date() + 1,
    content: "testtest22222"
  }
];

let params = {
  name: "localDB",
  storeName: "tasks",
  // createIndexArr: [{ index: "state" }, { index: "title" }, { index: "date" }],
  keyPath: { keyPath: "uniqueKey" }
};
let dbController = new indexedDBController(params);
// dbController.pushData(defaultData);
dbController.readAllData().then(res => {
  console.log(res);
});
// dbController.readData("00000000").then(res => {
//     console.log(res);
//   });
// dbController.updateData({
//   key: 123,
//   value: { state: "done", title: "aaaaaa" }
// });

export const A_renderDefaultTaskList = (
  type = "RENDER_DEFAULT_TASK_LIST",
  val
) => {
  return dispatch => {
    dbController.readAllData().then(res => {
      if (res.length === 0) {
        dbController.pushData(defaultData).then(res => {
          dispatch({
            type,
            val: res
          });
        });
      }
      res.sort((a, b) => {
        return a.date - b.date;
      });
      dispatch({
        type,
        val: res
      });
    });
  };
};

export const A_updateTaskInfo = (type, val) => {
  return { type, val };
};

export const A_updateNowTask = (type = "UPDATE_NOW_TASK", val) => {
  return dispatch => {
    // console.log(type, val);
    let uniqueKey = val.uniqueKey;
    dbController.readData(uniqueKey).then(res => {
      dispatch({
        type,
        val: res
      });
    });
  };
};

export const A_savePrevTask = (type = "SAVE_PREV_TASK", val) => {
  return dispatch => {
    let key = val.uniqueKey;
    dbController.updateData({ key, value: val }).then(res => {
      dispatch({ type, val });
    });
  };
};

export const A_addNewTask = (
  type = "ADD_NEW_TASK",
  val = { state: "", title: "", content: "" }
) => {
  return dispatch => {
    let template = {
      uniqueKey: renderUniqueKey(),
      state: "todo",
      title: "title",
      date: +new Date(),
      content: ""
    };
    template.title = val.title;

    dbController.pushData([template]).then(res => {
      dbController.readAllData().then(res => {
        res.sort((a, b) => {
          return a.date - b.date;
        });
        dispatch({ type, val: res });
      });
    });
  };
};

export const A_rerenderTaskList = (type = "RERENDER_TASK_LIST") => {
  return { type };
};

export const A_changeNowTaskState = (type = "ONCHANGE_NOW_TASK_STATE", val) => {
  return dispatch => {
    let temp = Object.assign({}, val);
    temp.state = temp.state === "done" ? "todo" : "done";
    dbController.updateData({ key: temp.uniqueKey, value: temp }).then(res => {
      dispatch({ type, val: temp });
    });
  };
};
