import React, { useMemo } from "react";
import Link from "next/link";
import Toggle from "../components/UI/Toggle";
import handler from "./api/fetchHandler";
import FeatureFlagPage from "./FeatureFlagPage";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "../components/Table/DataTable";
function HomePage(props) {
  let featureData = props.data.status && props.data.data;
  const featureFlag = {
    key: "1",
    name: "Feature Name",
    value: true,
    lastUpdatedDate: new Date("2022-03-25"),
  };

  const featureFlags = [
    {
      key: "1",
      name: "Feature 1",
      value: "On",
      lastUpdatedDate: new Date("2022-03-25"),
    },
    {
      key: "2",
      name: "Feature 2",
      value: "Off",
      lastUpdatedDate: new Date("2022-03-20"),
    },
    {
      key: "3",
      name: "Feature 3",
      value: "On",
      lastUpdatedDate: new Date("2022-02-25"),
    },
    {
      key: "4",
      name: "Feature 4",
      value: "Off",
      lastUpdatedDate: new Date("2022-01-25"),
    },
    {
      key: "5",
      name: "Feature 5",
      value: "Off",
      lastUpdatedDate: new Date("2021-12-25"),
    },
    {
      key: "6",
      name: "Feature 6",
      value: "Off",
      lastUpdatedDate: new Date("2022-03-17"),
    },
    {
      key: "7",
      name: "Feature 7",
      value: "On",
      lastUpdatedDate: new Date("2022-03-02"),
    },
    {
      key: "8",
      name: "Feature 8",
      value: "On",
      lastUpdatedDate: new Date("2022-03-10"),
    },
    {
      key: "9",
      name: "Feature 9",
      value: "On",
      lastUpdatedDate: new Date("2022-02-12"),
    },
    {
      key: "10",
      name: "Feature 10",
      value: "On",
      lastUpdatedDate: new Date("2022-02-29"),
    },
    {
      key: "11",
      name: "Feature 11",
      value: "Off",
      lastUpdatedDate: new Date("2022-02-05"),
    },
    {
      key: "12",
      name: "Feature 12",
      value: "On",
      lastUpdatedDate: new Date("2022-01-10"),
    },
    {
      key: "13",
      name: "Feature 13",
      value: "On",
      lastUpdatedDate: new Date("2022-01-18"),
    },
    {
      key: "14",
      name: "Feature 14",
      value: "On",
      lastUpdatedDate: new Date("2022-01-22"),
    },
    {
      key: "15",
      name: "Feature 15",
      value: "On",
      lastUpdatedDate: new Date("2022-01-16"),
    },
    {
      key: "16",
      name: "Feature 16",
      value: "On",
      lastUpdatedDate: new Date("2022-02-07"),
    },
    {
      key: "17",
      name: "Feature 17",
      value: "On",
      lastUpdatedDate: new Date("2021-11-25"),
    },
    {
      key: "18",
      name: "Feature 18",
      value: "On",
      lastUpdatedDate: new Date("2021-10-25"),
    },
    {
      key: "19",
      name: "Feature 19",
      value: "On",
      lastUpdatedDate: new Date("2021-09-25"),
    },
  ];

  return (
    <React.Fragment>
      <p>
        <Link href="feature-item/test"> This is a test link</Link>
      </p>
      <Toggle state={true}></Toggle>
      <FeatureFlagPage />
      <DataTable data={featureFlags} />
    </React.Fragment>
  );
}
export default HomePage;

export async function getStaticProps() {
  const response = await handler({
    url: "http://localhost:3001/1/false",
    method: "POST",
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
