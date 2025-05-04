import React from "react";
import { Route, Routes } from "react-router-dom";

const IndustryMdodule = React.lazy(() => import("./Industry"));
const AcadmiaMdodule = React.lazy(() => import("./Academia"));
const UserMdodule = React.lazy(() => import("./user"));
import { ErrorContentAtCenterOfView } from "@common/UI";

function User() {
  return (
    <Routes>
      <Route path="/*" element={<UserMdodule />} />
      <Route path="/industry/*" element={<IndustryMdodule />} />
      <Route path="/academia/*" element={<AcadmiaMdodule />} />
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
  );
}

export default User;
