import { Card, Grid } from "@mui/material";
import DataGrids from "../../../../TableMui/DataGrids";
import { customTheme } from "@theme/theme";
import IconsHeadings from "../../../../AnimationMui/IconHeadings";
import { ArticleOutlined } from "@mui/icons-material";
import data from "./data";
import { useEffect, useState } from "react";
import { useFetchAllPosts } from "../apiCall";
import { useSelector } from "react-redux";
function ProposalsList({ classified }) {
  const socket = useSelector((state) => state.socket.socket);
  const [FilterData, setFilterData] = useState([]);

  // is used to handle date
  const handleDate = (createdAt) => {
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
  };

  const { call } = useFetchAllPosts();
  //  structure data according to the table
  const StructureData = async () => {
    // fetch all projects
    const response = await call(classified);
    // check if there is any project not found
    if (response.message === "no projects found") return;

    // filter data where proposalsAmount is not 0
    const filterData = response?.filter((e) => e.proposalsAmount !== 0);
    const RestructuredData = filterData.map((item, index) => {
      const formattedDate = handleDate(item?.createdAt);
      return {
        id: index + 1,
        _id: item?._id,
        title: item?.title,
        Initiator: "Admin",
        applicationField: item?.applicationField,
        createdAt: formattedDate,
        proposalsAmount: item?.proposalsAmount,
      };
    });
    setFilterData(RestructuredData);
  };

  // is used to handle proposal amount changed
  const handleProposalAmountChanged = (data) => {
    setFilterData((prevFilterData) => {
      if (!prevFilterData?.some((item) => item?._id === data?._id)) {
        const createdAt = handleDate(data?.createdAt);
        return [
          ...prevFilterData,
          {
            ...data,
            createdAt,
            Initiator: "Admin",
            id: prevFilterData.length + 1,
          },
        ];
      }
      const filterData = prevFilterData?.map((e) => {
        return e?._id === data?._id
          ? { ...e, proposalsAmount: data?.proposalsAmount }
          : e;
      });
      return filterData;
    });
  };

  useEffect(() => {
    StructureData();
    socket?.on("updatedProjectForAdmin", handleProposalAmountChanged);
    return () => {
      socket?.off("updatedProjectForAdmin", handleProposalAmountChanged);
    };
  }, []);

  const { columns } = data();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card
          sx={{
            boxShadow: customTheme.palette.boxShadows.boxShadowTable,
          }}
        >
          <IconsHeadings
            text={"Proposals"}
            paddingLeft={2.7}
            paddingTop={3}
            paddingBottom={2}
            icons={<ArticleOutlined sx={{ color: "bg.darkBlue" }} />}
          />
          {FilterData.length > 0 && (
            <DataGrids dataRow={FilterData} toolBarGrid dataColumn={columns} />
          )}
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProposalsList;
