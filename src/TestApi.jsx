import { useEffect, useState } from "react";

function TestApi() {
  const [message, setMessage] = useState("...Loading...");

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("http://localhost:3000/api/hello");
      const data = await result.json();
      setMessage(data.message);
    }

    fetchData();
  }, []);

  return <div>Message: {message}</div>;
}

export default TestApi;
