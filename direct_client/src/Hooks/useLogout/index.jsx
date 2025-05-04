import { useDispatch } from "react-redux";
import { useAxios } from "../useAxios";
import { setProfile } from "@store/Features/ProfileSlice";
import Cookies from "js-cookie";

export const useLogout = () => {
  const { api } = useAxios();
  const dispatch = useDispatch();
  const logout = async (callback = () => {}) => {
    await api({
      url: "auth/logout",
      method: "POST",
      object: { data: null },
    }).finally((e) => {
      callback();
      dispatch(setProfile(null));
    });
  };
  const removeCookie = () => {
    Cookies.remove("subToken"); // Replace 'myCookie' with the actual cookie name
  };

  return { logout, removeCookie };
};
