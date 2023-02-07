import React, { useMemo } from "react";
import Toggle from "../components/UI/Toggle";
import handler from "./api/fetchHandler";

import FeatureFlagPage from "./FeatureFlagPage";
import DataTable from "../components/Table/DataTable";
function HomePage(props) {
  let featureData = props.data.status && props.data.data;
  const featureFlag = {
    key: "1",
    name: "Feature Name",
    value: true,
    lastUpdatedDate: new Date("2022-03-25"),
  };

  return (
    <React.Fragment>
      <FeatureFlagPage />
      <DataTable data={props.data.data} />
    </React.Fragment>
  );
}
export default HomePage;

export async function getStaticProps() {
  const response = await handler({
    url: "http://localhost:3001/featureflags",
    method: "GET",
  });
  if (response.status) {
    return {
      props: {
        data: response,
      },
      revalidate: 1,
    };
  } else {
    console.log(response.statusText);
    return {
      props: {
        data: response,
      },
      revalidate: 1,
    };
  }
}
