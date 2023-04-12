import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect, useReducer } from "react";
import FeatureFlagComponent from "../../components/FeatureFlag/FeatureFlag";
import FeatureFlag from "../../../shared/model/featureFlag";
import api from "../api/axios";
import LoadingModal from "../../components/FeatureFlag/LoadingModal";
import Modal from "../../components/UI/Modal";

/**
@function flagPageManager
@description Manages the state of the feature flag page.
@param {Object} state - The current state of the feature flag page.
@param {Object} action - The action to perform on the state.
@returns {Object} - The updated state of the feature flag page.
*/

const flagPageManager = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "DATA_GATHERED": {
      return {
        ...state,
        toggleState: action.response.data[0].value,
        feature: new FeatureFlag(
          action.response.data[0].key,
          action.response.data[0].name,
          action.response.data[0].value,
          action.response.data[0].lastUpdatedDate,
          action.response.data[0].description
        ),
        loading: false,
      };
    }
    case "TOGGLE_CHANGED": {
      return {
        ...state,
        toggleState: !state.toggleState,
      };
    }
    case "MODAL_SELECTION":
      {
        if (action.selection == "SAVED") {
          return {
            ...state,
            modalType: (
              <Modal
                title="Changes Saved"
                message="Feature flag status successfully updated!"
                onCancel={state.fncloseModal}
                onConfirm={state.fnreturnToHome}
              />
            ),
          };
        } else if (action.selection == "UNSAVED") {
          return {
            ...state,
            modalType: (
              <Modal
                title="Are You Sure?"
                message="You have not saved your changes and will lose them if you return home."
                onCancel={state.fncloseModal}
                onConfirm={state.fnreturnToHome}
              />
            ),
          };
        }
      }
      break;
  }
  return { ...state, modalType: null };
};

/**

@function FeaturePage
@description A page for managing a single feature flag.
@returns {JSX.Element} - The feature flag page component.
*/

export default function FeaturePage() {
  const router = useRouter();

  /**

Close modal function for managing the modal state
@function closeModal
*/
  const closeModal = () => {
    dispatchPageHandler({
      type: "MODAL_SELECTION",
    });
  };

  /**

Return to Home function for managing the modal state and navigating back to the home page
@function returnToHome
*/
  const returnToHome = () => {
    dispatchPageHandler({
      type: "MODAL_SELECTION",
    });
    router.push("/");
  };
  const [flagPage, dispatchPageHandler] = useReducer(flagPageManager, {
    loading: true,
    feature: {},
    toggleState: null,
    modalType: null,
    fncloseModal: closeModal,
    fnreturnToHome: returnToHome,
  });

  /**

Fetches the feature flag data from the server
@function fetchFeatureFlag
*/
  const fetchFeatureFlag = async () => {
    try {
      //Update path and data handling once feature flag specific api is set up
      const response = await api.get(`/featureflag/${router.query.featureId}`);
      console.log(response);
      dispatchPageHandler({
        type: "DATA_GATHERED",
        response: response,
      });
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

  useEffect(() => {
    fetchFeatureFlag();
    console.log("Effect ran on start");
  }, []);

      /**

Handles toggle state change when clicked
@function toggleStateHandler
*/
  const toggleStateHandler = () => {
    console.log("Toggle State Entered");
    dispatchPageHandler({
      type: "TOGGLE_CHANGED",
    });
  };

    /**

Saves the changed feature flag status to the backend
@function onSave
*/
  const onSave = async () => {
    //Post object new object to server
    try {
      console.log(flagPage.feature.key, flagPage.toggleState);
      const response = await api.post("/changeflag", {
        key: flagPage.feature.key,
        value: flagPage.toggleState,
      });

      //If Successful post
      console.log(response);
      if (response.status === 200) {
        dispatchPageHandler({
          type: "MODAL_SELECTION",
          selection: "SAVED",
        });
        fetchFeatureFlag();
        //If post is not successful
      } else {
        alert("Saved Failed: " + response.data.message);
      }
    } catch (err) {
      fetchFeatureFlag();
      console.log(flagPage.feature.value);
      alert("Saved Failed: " + err.message);
      console.log(`Error ${err.message}`);
    }
  };

      /**

Checks if status has been saved or updated before returning to home feature flag table
@function onReturn
*/
  const onReturn = () => {
    console.log(flagPage.toggleState, flagPage.feature.value);
    if (flagPage.toggleState !== flagPage.feature.value) {
      dispatchPageHandler({
        type: "MODAL_SELECTION",
        selection: "UNSAVED",
      });
      return;
    }
    router.push("/");
  };

  //Return the layout for the feature Id page
  return (
    <div>
      {flagPage.modalType}
      {flagPage.loading ? (
        <LoadingModal />
      ) : (
        <FeatureFlagComponent
          name={flagPage.feature.name}
          value={flagPage.toggleState}
          toggleStateHandler={toggleStateHandler}
          onSave={onSave}
          onReturn={onReturn}
          description={flagPage.feature.description}
        />
      )}
    </div>
  );
}
