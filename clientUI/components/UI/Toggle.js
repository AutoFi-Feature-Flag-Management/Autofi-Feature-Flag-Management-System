import React, { useState } from "react";
import classes from "../../styles/toggle.module.css";

function Toggle(props) {
  const [toggleState, setToggleState] = useState(props.state);
  const toggleStateHandler = () => {
    // props.onClick(!props.state);
    setToggleState((prevState) => {
      console.log(!prevState);
      return !prevState;
    });
  };
  return (
    <React.Fragment>
      <label className={classes["toggle-label"]}>
        <input
          className={classes["toggle-input"]}
          type="checkbox"
          defaultChecked={toggleState}
          onClick={toggleStateHandler}
        ></input>
        <span className={classes["toggle-span"]} />
      </label>
    </React.Fragment>
  );
}
export default Toggle;
