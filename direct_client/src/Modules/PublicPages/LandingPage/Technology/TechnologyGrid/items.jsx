import { useAxios } from "@hooks/index";

const getpath = (name) => {
  return `/assets/iconify/${name}.svg`;
};
const getRandomNumber = (data) => {
  const arr = data ?? subCategories;
  return Math.floor(Math.random() * arr?.length); // Modify as needed
};
export const useGetItems = () => {
  const { data } = useAxios("categories");

  const updateArrayWithObject = () => {
    var updatedArray = [];
    data?.forEach((element) => {
      const name = String(element.name).toLowerCase().split(" ");
      const n1 = name.join("");

      updatedArray.push({
        image: getpath(n1),
        name: element.name, // Set the name field to the sub-category
        industry: getRandomNumber(data),
        academia: getRandomNumber(data),
        experts: getRandomNumber(data),
        data: "rest", // You can modify this as needed
      });
    });
    return updatedArray;
  };
  return updateArrayWithObject();
};
