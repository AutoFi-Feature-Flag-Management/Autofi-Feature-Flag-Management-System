import React, { useMemo } from "react";
import handler from "./api/fetchHandler";
import DataTable from "../components/Table/DataTable";

function HomePage(props) {
  let rows = 10;
  if (typeof window !== "undefined" && localStorage.getItem("rowCount")) {
    rows = +localStorage.getItem("rowCount");
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
