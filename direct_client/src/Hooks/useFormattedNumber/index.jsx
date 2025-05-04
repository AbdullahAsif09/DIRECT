export const useFormattedNumber = () => {
  const formattedNumber = (number, useNotation = false) => {
    if (number !== undefined && number !== null) {
      if (useNotation) {
        return new Intl.NumberFormat("en-US", { notation: "compact" }).format(
          number
        );
      } else {
        return new Intl.NumberFormat("en-US").format(number);
      }
    }
    return "";
  };
  return formattedNumber;
};
