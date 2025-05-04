import React from "react";
import { useFetchProfile } from "./Hooks";
import { Outlet } from "react-router-dom";
import { Spinner } from "@common/UI";

const Fetcher = () => {
  const { data, error } = useFetchProfile();
  return data || error ? <Outlet /> : <Spinner isLoading={true} />;
};

export default Fetcher;
