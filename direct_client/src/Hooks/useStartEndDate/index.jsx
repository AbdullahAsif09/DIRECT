function useStartEndDate(document) {
  const startDate = new Date(document?.createdAt);

  // Calculate total duration from the details array
  const totalDuration = document?.details?.reduce(
    (total, detail) => total + detail.duration,
    0
  );

  // Calculate the end date by adding the total duration (in days) to the start date
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + totalDuration);

  return {
    startDate,
    endDate,
  };
}

export default useStartEndDate;
