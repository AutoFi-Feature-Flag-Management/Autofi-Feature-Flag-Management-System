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

  const onSave =() => {
    alert("Response from post");
    console.log("save");
  }

  const onReturn =() => {
    console.log("return");
  }

  useEffect(() => {
    const fetchFeatureFlag = async () => {
      try {
        console.log(loading);
        const response = await api.get("/featureflags");
        setFeature(
          new FeatureFlag(
            response.data[1].key,
            response.data[1].name,
            response.data[1].value,
            response.data[1].lastUpdatedDate,
            response.data[1].description
          )
        );
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
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingModal />
      ) : (
        <FeatureFlagComponent
          name={feature.name}
          value={feature.value}
          onSave={onSave}
          onReturn={onReturn}
        />
      )}
    </div>
  );
}

export default FeaturePage;
