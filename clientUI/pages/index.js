import React, { useMemo } from "react";
import handler from "./api/fetchHandler";

import DataTable from "../components/Table/DataTable";
function HomePage(props) {
  return (
    <React.Fragment>
      <DataTable pageSize={10} numberFeatures={props.data.data} />
    </React.Fragment>
  );
}
export default HomePage;

export async function getStaticProps() {
  const response = await handler({
    url: "http://localhost:3001/numberofflags",
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
    alert("Fetch Number Of Flags Failed: " + response.statusText);
    return {
      props: {
        data: response,
      },
      revalidate: 1,
    };
  }
}
