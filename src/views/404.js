import React from "react";
import { Link } from "react-router-dom";
let NotFound = () => {
  return (
    <div>
      404 Not Found
      <div>
        <Link to="/login">点击跳转login</Link>
      </div>
    </div>
  );
};

export default NotFound;
