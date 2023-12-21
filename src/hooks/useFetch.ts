import { UseFetchProps } from "@/types/global-types";
import { useState, useEffect } from "react";

export function useFetch<T>(url: string): UseFetchProps<T> {
  const [data, setData] = useState<T | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Response Error");
        }
        return res.json();
      })

      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: Error) => setError(error.message));
  }, [url]);

  return {
    loading,
    error,
    data,
  };
}
