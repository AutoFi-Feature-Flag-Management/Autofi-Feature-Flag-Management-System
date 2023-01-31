import React from "react";
import Link from "next/link";
import Toggle from "../components/UI/Toggle";
import handler from "./api/fetchHandler";
import FeatureFlagPage from "./FeatureFlagPage";

function HomePage(props) {
  let featureData = props.data.status && props.data.data;
  console.log(featureData);
  return (
    <React.Fragment>
      <p>
        <Link href="feature-item/test"> This is a test link</Link>
      </p>
      <Toggle state={true}></Toggle>
      <FeatureFlagPage />
      
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
