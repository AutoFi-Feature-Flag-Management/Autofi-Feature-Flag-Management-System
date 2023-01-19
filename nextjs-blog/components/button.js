import React, { useState } from "react";

import Card from "./styles/Card";

const Button = (props) => {
  const clickHandler = () => {};

  return (
    <Card className="button">
      <button onClick={clickHandler}>{props.title}</button>
    </Card>
  );
};

export default Button;
