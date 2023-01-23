import { useCallback, useState } from "react";

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = useCallback(async (fetchCallInfo, applyData) => {
    setIsLoading(true);
    setError(false);
    try {
      const response = fetch(fetchCallInfo.url, {
        method: fetchCallInfo.method ? fetchCallInfo.method : "GET",
        headers: fetchCallInfo.headers ? fetchCallInfo.headers : {},
        body: fetchCallInfo.body ? JSON.stringify(fetchCallInfo.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request failed please review console log.");
      }
    } catch {
      setError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  }, []);
  return { error, isLoading, sendRequest };
}
export default useFetch();
