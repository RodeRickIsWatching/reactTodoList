const initState = {
  nowTaskObj: {},
  defaultList: []
};

export default (state = initState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "RENDER_DEFAULT_TASK_LIST":
      newState.defaultList = [...action.val];
      return newState;
    case "UPDATE_NOW_TASK":
      newState.nowTaskObj = action.val;
      // newState.textareaInfo = action.val.textareaInfo;
      return newState;
    case "SAVE_LAST_TASK":
      console.log(action.val);
    case "ONCHANGE_CONTENT":
      newState.nowTaskObj.content = action.val;
      // 改变任务content
      return newState;
    case "ONCHANGE_TASKTITLE":
      newState.nowTaskObj.title = action.val;
      // 改变任务title
      return newState;
    case "ADD_NEW_TASK":
      // 添加新的任务
      console.log("add");
      newState.defaultList = [...action.val];
      return newState;
    case "RERENDER_TASK_LIST":
      console.log("rerender");
      return newState;
    case "ONCHANGE_NOW_TASK_STATE":
      newState.defaultList.forEach(item => {
        if (item.uniqueKey === action.val.uniqueKey) {
          item.state = action.val.state;
        }
      });
      newState.nowTaskObj = action.val;
      return newState;
    default:
      return newState;
  }
};
