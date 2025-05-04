import { useState, useEffect, useCallback } from "react";
import { keys } from "@config";
import axios from "axios";

export const useAxios = (url, method = "get", object, parms = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelTokenSource = axios.CancelToken.source();
    if (url?.includes("/undefined") || url?.includes("/null")) return;

    if (!url || !method) return;

    setLoading(true);

    axios({
      method: method,
      url: keys.api + url,
      params: parms,
      data: object ?? undefined,
      withCredentials: true,
      cancelToken: cancelTokenSource.token,
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // Clean up function to cancel the request if the component unmounts
    return () =>
      cancelTokenSource.cancel("Request canceled due to component unmounting");
  }, [url]);

  const API = useCallback(
    async ({ url, method, object }) => {
      try {
        if (!url || url?.includes("undefined") || url?.includes("null")) return;
        setLoading(true);

        const response = await axios({
          method: method,
          url: keys.api + url,
          params: parms,
          data: object ?? undefined,
          withCredentials: true,
        });

        setData(response.data);
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError(error);
        }

        return error?.response?.data
          ? error
          : {
              type: "failure",
              result:
                error?.response?.data?.result ??
                error?.message ??
                "Error occurred",
              code: 500,
            };
      } finally {
        setLoading(false);
      }
    },
    [parms]
  );
  const api = useCallback(
    async ({ url, method, object }) => {
      try {
        if (!url || url?.includes("undefined") || url?.includes("null")) return;

        const response = await axios({
          method: method,
          url: keys.api + url,
          params: parms,
          data: object ?? undefined,
          withCredentials: true,
        });

        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        }

        return (
          error?.response?.data ?? {
            type: "failure",
            result:
              error?.response?.data?.result ??
              error?.message ??
              "Error occurred",
            code: 500,
          }
        );
      }
    },
    [url]
  );

  return { data, loading, error, API, api, setData };
};
