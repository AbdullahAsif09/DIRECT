export function useDate({ createdAt }) {
  const date = new Date(createdAt);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daySuffix = ["th", "st", "nd", "rd"];
  const day = date.getDate();
  const formattedDate = `${day}${
    daySuffix[(day - 20) % 10] || daySuffix[day] || daySuffix[0]
  } ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  return formattedDate;
}
