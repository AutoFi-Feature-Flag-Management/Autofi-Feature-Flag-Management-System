import React from "react";
import { useEffect, useState } from "react";
import classes from "../styles/table.module.css";
import Cell from "./Cell";

function Table(props) {
  const [features, setFeatures] = useState(props.featureData);

  //   const sizeChange = (event) => {
  //     console.log(event.currentTarget.innerWidth);
  //     setScreenWidth(event.currentTarget.innerWidth);
  //   };
  //   useEffect(() => {
  //     window.addEventListener("resize", sizeChange);
  //     return () => {
  //       console.log("listenerkilled");
  //       window.removeEventListener("resize", sizeChange);
  //     };
  //   }, []);

  return (
    <div className={classes.table}>
      <h2 className={classes["table-header"]}>Feature Flags</h2>
      {features.map((feature) => {
        return (
          <Cell
            key={feature.feature}
            feature={feature.feature}
            date={feature.date}
            state={feature.state}
          ></Cell>
        );
      })}
    </div>
  );
}
export default Table;
// {newMatrix.map((row) => {
//     return (
//       <div className={classes.row}>
//         {row.map((feature) => {
//           return (
//             <Cell
//               feature={feature.feature}
//               date={feature.date}
//               state={true}
//             ></Cell>
//           );
//         })}
//       </div>
//     );
//   })}
