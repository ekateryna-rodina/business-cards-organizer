import React, { Fragment } from "react";
import spinner from "../layout/Loading_icon.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "200px", display: "block", margin: "auto" }}
      />
    </Fragment>
  );
};

export default Spinner;
