import { useState } from "react";
import { useAxios } from "../useAxios";

const adminUrl = (query) => `admin/getAllAdmins${query ? `?${query}` : ""}`;
const userUrl = (query) => `account/getallusers${query ? `?${query}` : ""}`;
const UAUrl = (query) => `userAgency/getAllUsers${query ? `?${query}` : ""}`;
const FAUrl = (query) => `fundingAgency/getAllUsers${query ? `?${query}` : ""}`;
const acadUrl = (query) => `academia/getAllUsers${query ? `?${query}` : ""}`;
const indusUrl = (query) => `industry/getAllUsers${query ? `?${query}` : ""}`;

export const useGetProfiles = () => {
  const { API } = useAxios();

  const [fundingAgency, setFundingAgency] = useState([]);
  const [userAgency, setUserAgency] = useState([]);
  const [academia, setAcademia] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [users, setUsers] = useState([]);
  const [adminProfiles, setAdminProfiles] = useState([]);

  const fetchData = async (url, setter) => {
    try {
      const data = await API({ url });
      const result = data?.result || [];
      setter(result);
      return data?.result ?? [];
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
      setter([]);
      return [];
    }
  };

  const getFundingAgency = (query) => fetchData(FAUrl(query), setFundingAgency);
  const getUserAgency = (query) => fetchData(UAUrl(query), setUserAgency);
  const getAcademia = (query) => fetchData(acadUrl(query), setAcademia);
  const getIndustry = (query) => fetchData(indusUrl(query), setIndustry);
  const getAdmin = (query) => fetchData(adminUrl(query), setAdminProfiles);
  const getUser = (query) => fetchData(userUrl(query), setUsers);

  const getAllProfiles = async (query) => {
    await Promise.all([
      getFundingAgency(query),
      getUserAgency(query),
      getAcademia(query),
      getIndustry(query),
      getAdmin(query),
      getUser(query),
    ]);
  };

  return {
    /* states */
    fundingAgency,
    userAgency,
    academia,
    industry,
    users,
    adminProfiles,

    /* functions */
    getAllProfiles,
    getFundingAgency,
    getUserAgency,
    getAcademia,
    getIndustry,
    getAdmin,
    getUser,
  };
};
