import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorContentAtCenterOfView } from "@common/UI";
import withAuth from "./authenticator";
import Rooms from "./rooms";
function DirectRooms({ isAdmin }) {
  const AuthRooms = withAuth(Rooms);
  return (
    <Routes>
      <Route path="/" element={<AuthRooms isAdmin={isAdmin} />} />
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

export default DirectRooms;
