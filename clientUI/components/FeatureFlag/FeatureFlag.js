/**

A React component for displaying and modifying feature flags.
@param {object} props - The props that are passed to the component.
@param {string} props.name - The name of the feature flag.
@param {string} props.description - The description of the feature flag.
@param {boolean} props.value - The current value of the feature flag.
@param {function} props.toggleStateHandler - The function to call when the feature flag is toggled.
@param {function} props.onSave - The function to call when the "Save" button is clicked.
@param {function} props.onReturn - The function to call when the "Home" button is clicked.
@returns {JSX.Element} A React component representing the feature flag.
*/

import autofiIcon from "../../public/autofi_icon.png";
import Image from "next/Image";
import React from "react";
import classes from '../../styles/FeatureFlagPage.module.css';
import Toggle from '../UI/Toggle'
import Button from "../UI/button";

export default function FeatureFlag(props) {
  console.log("Rendered")
  console.log(props.value)

  return (
    <React.Fragment>
      <div>
        <div className={classes.title}>
          <h1>
            <Image src={autofiIcon} alt="AutoFi Icon" className={classes.img} />
            {props.name}
          </h1>
        </div>

        <div className={classes.description}>
          {props.description}
        </div>

        <div className={classes.toggle}>
          <Toggle state={props.value} toggleStateHandler={props.toggleStateHandler} />
        </div>

        <div className={classes.container}>
          <Button onClick={props.onSave}>Save</Button>
          <Button onClick={props.onReturn}>Home</Button>
        </div>
      </div>
    </React.Fragment>
  );
}
