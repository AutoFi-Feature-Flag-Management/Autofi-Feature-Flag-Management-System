import React from "react";
import Toggle from "../components/Toggle";
import Button from "../components/Button";

function HomePage() {
  const onButtonClick = () => {
    console.log("Button was clicked");
  };

  return (
    <React.Fragment>
      <h1>The home Page</h1>
      <Toggle></Toggle>
      <Button onClick={onButtonClick} title="Test"></Button>
    </React.Fragment>
  );
}
export default HomePage;
