import React from "react";
import Toggle from "../components/Toggle";
function HomePage() {
  return (
    <React.Fragment>
      <h1>The home Page</h1>
      <Toggle state={true}></Toggle>
    </React.Fragment>
  );
}
export default HomePage;
