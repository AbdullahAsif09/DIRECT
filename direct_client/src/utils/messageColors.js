export const stringToColor = (string = " ") => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    const lightValue = Math.floor((value % 128) + 128);
    color += ("00" + lightValue.toString(16)).slice(-2);
  }
  return color;
};
export const stringToDarkColor = (string = " ") => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    // Ensuring the color component is in the range [0, 128] to make it darker
    const darkValue = Math.floor(value / 2);
    color += ("00" + darkValue.toString(16)).slice(-2);
  }
  return color;
};
