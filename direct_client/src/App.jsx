import { useFetchProfile, useRefreshCookie, useSocket } from "@hooks/index";
import ErrorBoundaryFallback from "@common/ErrorBoundryFallback";
import { ErrorContentAtCenterOfView, Spinner } from "@common/UI";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import { CssBaseline } from "@mui/material";
import { customTheme } from "@theme/theme";
import { useSelector } from "react-redux";
import React, { Suspense } from "react";
import Alerts from "@common/Alert";

const FundingAgency = React.lazy(() => import("@modules/FundingAgency"));
const Organization = React.lazy(() => import("@modules/Organization"));
const PublicPages = React.lazy(() => import("@modules/PublicPages"));
const Department = React.lazy(() => import("@modules/Department"));
const UserAgency = React.lazy(() => import("@modules/UserAgency"));
const Executive = React.lazy(() => import("@modules/Executive"));
const AdminModule = React.lazy(() => import("@modules/Admin"));
const User = React.lazy(() => import("@modules/User"));

function App() {
  const loading = useSelector((state) => state.loading?.loading);
  /* refresh cookie */
  useRefreshCookie();
  /* fetching profile */
  useFetchProfile();
  /* socket connection */
  useSocket();

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {loading && <Spinner isLoading={loading} />}
      <div className="app">
        <Alerts />

        <ErrorBoundary fallbackRender={ErrorBoundaryFallback}>
          <Suspense fallback={<Spinner isLoading={true} />}>
            <Routes>
              {/* <Route path="/" element={<Fetcher />}> */}
              <Route element={<PublicPages />} path="/*" />
              <Route element={<User />} path="/user/*" />
              <Route element={<AdminModule />} path="/directportal/*" />
              <Route element={<UserAgency />} path="/useragency/*" />
              <Route element={<FundingAgency />} path="/fundingagency/*" />
              <Route element={<Executive />} path="/executive/*" />
              <Route element={<Department />} path="/department/*" />
              <Route element={<Organization />} path="/organization/*" />
              {/* </Route> */}
              <Route
                path="*"
                element={
                  <ErrorContentAtCenterOfView
                    code={404}
                    message="Resource Not Found!"
                  />
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}

export default App;
