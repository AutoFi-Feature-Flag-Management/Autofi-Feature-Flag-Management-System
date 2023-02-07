import React from "react";
import Link from "next/link";
import Toggle from "../components/UI/Toggle";
import handler from "./api/fetchHandler";

import Table from "../components/Table";
function HomePage(props) {
  let featureData = props.data.status && props.data.data;
  const array = [
    {
      feature: "test 1",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 2",
      date: "01/01/2020",
      state: false,
    },
    {
      feature: "test 3",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 4",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 5",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 6",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 7",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 8",
      date: "01/01/2020",
      state: false,
    },
    {
      feature: "test 9",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 10",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 11",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 12",
      date: "01/01/2020",
      state: false,
    },
    {
      feature: "test 13",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 14",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 15",
      date: "01/01/2020",
      state: false,
    },
    {
      feature: "test 16",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 17",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 18",
      date: "01/01/2020",
      state: true,
    },
    {
      feature: "test 19",
      date: "01/01/2020",
      state: true,
    },
  ];
  return (
    <React.Fragment>
      <p>
        <Link href="feature-item/test"> This is a test link</Link>
      </p>
      <Toggle state={true}></Toggle>

      <Table featureData={array}></Table>
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
