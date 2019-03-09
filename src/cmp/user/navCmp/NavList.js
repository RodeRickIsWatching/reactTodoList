import React from "react";
import { Link } from "react-router-dom";

function navList(props) {
  return (
    <ul className="nav-list">
      {props.navList.map((item, index) => {
        return (
          <li key={item.key}>
            <Link
              to={`/user/${"admin"}/${item.key}`}
              className={item.key===props.navItem?"nav-active":''}
              onClick={() => {
                props.findTaskByIndex(item.key);
                // this.forceUpdate();
              }}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default navList;
