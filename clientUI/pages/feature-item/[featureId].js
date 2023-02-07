import { useRouter } from "next/router";
import React from "react";
import Modal from "../../components/UI/Modal";
import { useState, useEffect } from "react";
import Button from "../../components/UI/button";
import Toggle from "../../components/UI/Toggle";
import autofiIcon from "../../public/autofi_icon.png";
import Image from "next/Image";
import classes from "../../styles/FeatureFlagPage.module.css";
import { handler } from "../api/fetchHandler";

const featureFlag = {
  key: "1",
  name: "Feature Name",
  value: true,
  lastUpdatedDate: new Date("2022-03-25"),
};

function FeaturePage() {
  const router = useRouter();
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [feature, setFeature] = useState({});

  // useEffect(async () => {
  //   const response = await handler({
  //     url: "http://localhost:3001/featureflags",
  //     method: "GET",
  //   });
  //   return (setFeature({data: response}));
  // })

  const test = async () => {
    const response = await handler({
      url: "http://localhost:3001/featureflags",
      method: "GET",
    });
    return setFeature({ data: response });
  };

  console.log(feature);

  const onCloseModal = () => {
    setModalType("");
  };

  const onReturnHome = () => {
    console.log("Return home");
    setModalType("");
    router.push("/");
  };

  let postResponse;
  const onSave = () => {
    //Step 1: send POST request for feature flag
    postResponse = "Changes saved!";
    setModalType("Saved");
    //Step 2: Display post response on modal --> changes saved or error
  };

  const onReturn = () => {
    //Check and see if there has been a change to status without saving
    //Toggle should be tracking every time it has been switched
    setModalType("Home");
  };

  return (
    <React.Fragment>
      <div>
        {modalType === "Saved" && (
          <Modal
            title={postResponse}
            message="Feature flag status has been updated successfully."
            onCancel={onCloseModal}
            onConfirm={onReturnHome}
          />
        )}
        {modalType === "Home" && (
          <Modal
            title="Are you Sure?"
            message="If you return to home any status changes will be lost."
            onCancel={onCloseModal}
            onConfirm={onReturnHome}
          />
        )}
        <div className={classes.title}>
          <h1>
            <Image src={autofiIcon} alt="AutoFi Icon" className={classes.img} />
            {featureFlag.name}
          </h1>
        </div>

        <div className={classes.toggle}>
          <Toggle />
        </div>

        <div className={classes.container}>
          <Button onClick={onSave}>Save</Button>
          <Button onClick={onReturn}>Home</Button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default FeaturePage;
