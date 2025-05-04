import React from "react";
import { Route, Routes } from "react-router-dom";
import withAuth from "../User/authenticator";

const RateProposal = React.lazy(() => import("./RateProposal"));
const ProposalLists = React.lazy(() => import("./ProposalLists"));
const PropjectsProposals = React.lazy(() => import("./ProjectsProposals"));
function Reviewer() {
  const AuthenticatedPropjectsProposals = withAuth(PropjectsProposals);
  const AuthenticatedProposalLists = withAuth(ProposalLists);
  const AuthenticatedRateProposal = withAuth(RateProposal);
  return (
    <Routes>
      <Route index path="/" element={<AuthenticatedPropjectsProposals />} />
      <Route
        path="/proposallists/:id"
        element={<AuthenticatedProposalLists />}
      />
      <Route path="/rateproposal/:id" element={<AuthenticatedRateProposal />} />
    </Routes>
  );
}

export default Reviewer;
