import React from "react";
import Link from "next/link";
import Toggle from "../components/Toggle";
import handler from "./api/fetchHandler";
function HomePage(props) {
  let featureData = props.data.status && props.data.data;
  console.log(featureData);
  return (
    <React.Fragment>
      <p>
        <Link href="feature-item/test"> This is a test link</Link>
      </p>
      <Toggle state={true}></Toggle>
      {/* <p>{props.data.name}</p> */}
    </React.Fragment>
  );
}
export default HomePage;

export async function getStaticProps() {
  const response = await handler({
    url: "https://swapi.dev/api/people/1",
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
