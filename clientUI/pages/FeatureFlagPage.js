import Modal from "../components/UI/Modal";
import { useState } from "react";
import Button from "../components/UI/button";
import Toggle from "../components/UI/Toggle";
import autofiIcon from "../public/autofi_icon.png";
import Image from "next/Image";
import classes from "../styles/FeatureFlagPage.module.css";

const featureFlag = {
  key: "1",
  name: "Feature Name",
  value: true,
  lastUpdatedDate: new Date("2022-03-25"),
};

const cancelButton = "Return to Feature Flag";
const confirmButton = "Return to Summary";

export default function FeatureFlagPage() {
  const [modalType, setModalType] = useState("");

  const onCloseModal = () => {
    setModalType("");
  };

  const onReturnHome = () => {
    //Redirects back to home page
    setModalType("");
  };

  const onSave = () => {
    setModalType("Saved");
  };

  const onReturn = () => {
    setModalType("Home");
  };

  return (
    <div>
      {modalType === "Saved" && (
        <Modal
          title="Changes Saved!"
          message="Feature flag status has been updated successfully."
          confirmButton={confirmButton}
          cancelButton={cancelButton}
          onCancel={onCloseModal}
          onConfirm={onReturnHome}
        />
      )}
      {modalType === "Home" && (
        <Modal
          title="Are you Sure?"
          message="If you return to home any status changes will be lost."
          confirmButton={confirmButton}
          cancelButton={cancelButton}
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
  );
}
