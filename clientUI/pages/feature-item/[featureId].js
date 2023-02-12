import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import FeatureFlagComponent from "../../components/FeatureFlag/FeatureFlag";
import FeatureFlag from "../../../shared/model/featureFlag";
import api from "../api/axios";
import LoadingModal from "../../components/FeatureFlag/LoadingModal";

function FeaturePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [feature, setFeature] = useState({});
  const [toggleState, setToggleState] = useState(null);
  const [unsavedChange, setUnsavedChange] = useState(false);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    const fetchFeatureFlag = async () => {
      try {
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
      //If Successful post
        //Set postResponse to "" again
        setPosted(true);
        setUnsavedChange(false);
      console.log(response.data);
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  const onReturn = () => {
    //Figure out how to check if status has been changed without save.
    if (unsavedChange) {
      //Render an Are You Sure? modal
      alert(
        "You have unsaved changes. If you return home they won't be saved."
      );
      return;
    }
    router.push("/");
  };

  return (
    <div>
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
