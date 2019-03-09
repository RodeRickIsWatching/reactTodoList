import React from "react";
import StateBox from "../stateBoxCmp/StateBox"



function TopMenu(props) {
  return (
    <>
        <StateBox/>
        <div className="date-box">今天</div>
    </>
  );
}

export default TopMenu;
