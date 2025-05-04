import { useCallback, useEffect, useRef } from "react";
import Crypto from "crypto-js";
import { useSelector } from "react-redux";
import { useAxios } from "../useAxios";

export const useRefreshCookie = () => {
  const profile = useSelector((state) => state.profile.profile);
  const { api } = useAxios();
  const intervalRef = useRef(null);

  const refreshToken = useCallback(() => {
    const data = Crypto.AES.encrypt(
      JSON.stringify({
        date: new Date(),
        userId: profile._id,
        role: profile?.role[0],
      }),
      profile._id + import.meta.env.VITE_CRYPTO_SECRET_CLIENT_KEY
    ).toString();

    api({ url: "auth/refresh", method: "post", object: { data } });
  }, []);

  useEffect(() => {
    if (!profile) return;

    // Set interval to refresh token
    intervalRef.current = setInterval(refreshToken, 600000); // 10 minutes

    // Clear interval on component unmount or profile change
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [profile]); // Added API to dependencies

  return null;
};
