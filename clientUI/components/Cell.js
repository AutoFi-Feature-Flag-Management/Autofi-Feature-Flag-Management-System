import { useState } from "react";
import { getStaticProps } from "../pages";
import classes from "../styles/cell.module.css";
function Cell(props) {
  const featurePageRouter = (event) => {
    console.log("hello");
  };
  return (
    <div
      onClick={featurePageRouter}
      className={
        props.state
          ? `${classes.cell} ${classes.on}`
          : `${classes.cell} ${classes.off}`
      }
    >
      <h2>{props.feature}</h2>
      <div className={classes["data-wrapper"]}>
        {props.feature ? <h3 className={classes.header}>Date:</h3> : <h3></h3>}
        <h3 className={classes.data}>{props.date}</h3>
      </div>
    </div>
  );
}
export default Cell;
