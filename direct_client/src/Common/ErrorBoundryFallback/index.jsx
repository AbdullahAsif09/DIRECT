import React from "react";
import { ErrorContentAtCenterOfView } from "../UI";

const ErrorBoundaryFallback = ({ error, resetErrorBoundary }) => (
  <ErrorContentAtCenterOfView code={500} message={error.message} />
);

export default ErrorBoundaryFallback;
