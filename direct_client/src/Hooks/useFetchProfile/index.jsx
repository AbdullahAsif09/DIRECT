import { useEffect } from "react";
import { useAxios } from "..";
import { useDispatch } from "react-redux";
import { setProfile } from "@store/Features/ProfileSlice";

export const useFetchProfile = () => {
  const { data, loading, API, error } = useAxios();
  const dispatch = useDispatch();
  useEffect(() => {
    API({ url: "auth/getprofile", method: "POST" }).then((e) => {
      const isError = e?.response?.data?.result ?? e?.response?.data?.message;

      if (
        e?.result == "No token provided. Please log in again." ||
        e?.message == "Token expired" ||
        isError
      ) {
        // dispatch(setProfile(null));
      }
      if (e?._id) dispatch(setProfile(e));
    });
    return () => {};
  }, []);

  return { data, loading, error };
};
