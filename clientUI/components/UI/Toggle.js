import React, { useState } from "react";
import classes from "../../styles/toggle.module.css";

function Toggle(props) {
  const [toggleState, setToggleState] = useState(props.state);

  return (
    <React.Fragment>
      <div
        className={`${classes["toggleContainer"]} ${
          props.state
            ? classes["toggleContainerTrue"]
            : classes["toggleContainerFalse"]
        }`}
        onClick={props.toggleStateHandler}
      >
        <div
          className={`${classes["toggle"]} ${
            props.state ? classes["stateTrue"] : classes["stateFalse"]
          }`}
        ></div>
      </div>
    </React.Fragment>
  );
}
export default Toggle;
