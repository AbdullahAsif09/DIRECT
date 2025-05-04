import { useAxios } from "@hooks";

export const useFetchAllPosts = () => {
  const { api } = useAxios();
  const call = async (classified) => {
    try {
      const data = await api({
        url: "projects/getPublishedProjects",
        method: "post",
        object: {
          classified,
        },
      });

      if (typeof data?.result === "string") {
        return { message: "no projects found" };
      } else if (Array.isArray(data?.result)) {
        return data.result;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { call };
};
