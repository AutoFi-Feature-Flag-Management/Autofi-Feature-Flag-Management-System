import React, { useMemo } from "react";
import handler from "./api/fetchHandler";
import DataTable from "../components/Table/DataTable";

function HomePage(props) {
  let rows = null;
  if (typeof window !== "undefined") {
    rows = +localStorage.getItem("rowCount");
  } else {
    rows = 10;
  }

  return (
    <React.Fragment>
      <DataTable pageSize={rows} numberFeatures={props.data.data} />
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
    console.log("Fetch Number Of Flags Failed: " + response.statusText);
    return {
      props: {
        data: response,
      },
      revalidate: 1,
    };
  }
}
