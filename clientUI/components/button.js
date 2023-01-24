import React, { useState } from "react";

import Card from "./Card";

const Button = (props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <Card className="button">
      <button onClick={clickHandler}>{props.children}</button>
    </Card>
  );
};

export default Button;
