import { useRouter } from "next/router";

function NewsPage() {
  const router = useRouter();

  return <p>{router.query.featureId}</p>;
}
export default NewsPage;
