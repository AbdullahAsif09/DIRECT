import { keys } from "@config";
import { useLogout } from "..";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFlag, setSocket } from "@store/Features/SocketSlice";

// Define routes where the socket connection should be removed
const urlsToRemove = [
  "user/academia/createprofile",
  "user/industry/createprofile",
  "login",
  "signup",
  "forgotpassword",
];

export const useSocket = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { removeCookie } = useLogout();
  const profile = useSelector((state) => state.profile?.profile);
  const socket = useRef(null); // Initialize socket ref

  // Function to check if the cookie should be removed
  const checkIfCookieNeedsToBeRemoved = () => {
    const isAcademia = pathname.startsWith("/user/academia");
    const isIndustry = pathname.startsWith("/user/industry");
    // Remove cookie if not on academia or industry paths
    if (!isAcademia && !isIndustry) {
      removeCookie(); // Assumes removeCookie handles cookies correctly
    }
  };

  useEffect(() => {
    // Exit early if no profile ID is found
    if (!profile?._id) return;

    // Check if the cookie needs to be removed
    checkIfCookieNeedsToBeRemoved();

    // Check if the pathname matches any routes that require socket disconnection
    if (
      pathname === "/" ||
      urlsToRemove.some((url) => pathname.includes(url))
    ) {
      // Disconnect the socket if already connected
      socket.current?.disconnect();
      dispatch(setSocket(null)); // Reset socket state in Redux
      return;
    }

    // Establish a new socket connection
    socket.current = io(keys.rootserver, {
      query: {
        userID: profile?._id,
        role: profile?.role[0],
      },
      withCredentials: true, // Allows credentials (cookies) to be sent with the socket connection
    });

    // Handle the socket connection event
    socket.current.on("connect", () => {
      dispatch(setFlag()); // Set the flag in Redux to indicate successful connection
    });

    // Set the current socket in Redux
    dispatch(setSocket(socket.current));

    // Cleanup function: disconnect the socket and reset Redux state on unmount
    return () => {
      socket.current?.disconnect(); // Disconnect the socket when the component unmounts
      dispatch(setSocket(null)); // Reset the socket state in Redux
    };
  }, [profile?._id, pathname, dispatch, removeCookie]);

  return null; // The hook does not render anything
};
