import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import FeatureFlagComponent from "../../components/FeatureFlag/FeatureFlag";
import FeatureFlag from "../../../shared/model/featureFlag";
import api from "../api/axios";
import LoadingModal from "../../components/FeatureFlag/LoadingModal";
import Modal from "../../components/UI/Modal";

function FeaturePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [feature, setFeature] = useState({});
  const [toggleState, setToggleState] = useState(null);
  const [unsavedChange, setUnsavedChange] = useState(false);
  const [posted, setPosted] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchFeatureFlag = async () => {
      try {
        setLoading(true);
        setPosted(false);
        //Update path and data handling once feature flag specific api is set up
        const response = await api.get("/featureflags");
        setFeature(
          new FeatureFlag(
            response.data[0].key,
            response.data[0].name,
            response.data[0].value,
            response.data[0].lastUpdatedDate,
            response.data[0].description
          )
        );
        setToggleState(response.data[0].value);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          // Not in 200 response range
          console.log(err.response.data);
        } else {
          //No response at all (404, etc)
          console.log(`Error ${err.message}`);
        }
      }
    };
    fetchFeatureFlag();
    console.log("effect ran");
  }, [posted]);

  const toggleStateHandler = () => {
    setToggleState((prevState) => {
      if (!prevState !== feature.value) {
        setUnsavedChange(true);
        return !prevState;
      } else {
        setUnsavedChange(false);
        return !prevState;
      }
    });
  };

  const onSave = async () => {
    //Post object new object to server
    try {
      const response = await api.post("/" + feature.key + "/" + toggleState);
      //TODO: Set up post response handling
      //If Successful post
      const success = true;
      if (success) {
        setPosted(true);
        setUnsavedChange(false);
        setModalType("Saved");
      } else {
        setPosted(false);
        alert(response.data.message);
      }
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const onReturn = () => {
    if (unsavedChange) {
      //Render an Are You Sure? modal
      setModalType("Return");
      return;
    }
    router.push("/");
  };

  const closeModal = () => {
    setModalType("");
  };

  const returnToHome = () => {
    setModalType("");
    router.push("/");
  };

  return (
    <div>
      {modalType === "Return" && (
        <Modal
          title="Are You Sure?"
          message="You have not saved your changes and will lose them if you return home."
          onCancel={closeModal}
          onConfirm={returnToHome}
        />
      )}
      {modalType === "Saved" && (
        <Modal
          title="Changes Saved"
          message="Feature flag status successfully updated!"
          onCancel={closeModal}
          onConfirm={returnToHome}
        />
      )}
      {loading ? (
        <LoadingModal />
      ) : (
        <FeatureFlagComponent
          name={feature.name}
          value={feature.value}
          toggleStateHandler={toggleStateHandler}
          onSave={onSave}
          onReturn={onReturn}
        />
      )}
    </div>
  );
}

export default FeaturePage;
