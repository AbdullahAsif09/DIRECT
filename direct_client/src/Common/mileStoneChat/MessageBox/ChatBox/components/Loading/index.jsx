export const Loading = ({ pageLoading, condition }) => {
  return pageLoading && condition ? "loading....." : null;
};
