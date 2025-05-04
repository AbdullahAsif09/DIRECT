import { Grid, Typography } from "@mui/material";
import CommonTable from "@common/TableMui/CommonTable";
import { useState } from "react";
import { useEffect } from "react";
const arrayHeading = ["Bank Name", "Branch", "Account No."];
const arrayContent = [
  [{ name: "HBL", branch: "G10", accountNo: "2348203948235098235" }],
  [{ name: "Alfalah", branch: "G11", accountNo: "54754747457457457" }],
  [{ name: "Al Islamic", branch: "G13", accountNo: "5467682142341414" }],
  [{ name: "Meezan", branch: "G9", accountNo: "12312313434343445345" }],
  [{ name: "HBL", branch: "F7", accountNo: "82039482350985235454" }],
];
function ForeignBankAccount({ profileData }) {
  const [TableData, setTableData] = useState();
  useEffect(() => {
    const ChechObjectValues = () => {
      profileData?.map((e, i) => {
        const areKeysEmpty = Object.values(e).every((value) => !value);
        if (areKeysEmpty === true) {
          setTableData("No Data Found");
        } else {
          setTableData(profileData);
        }
      });
    };
    ChechObjectValues();
  }, [profileData]);
  return (
    <div>
      <Grid container gap={4}>
        <Grid item xs={12}>
          <Typography variant="h3">Firm’s Foreign Bank Accounts</Typography>
        </Grid>
        <Grid item xs={12}>
          <CommonTable
            tableData={TableData}
            contentData={arrayContent}
            headerHeading={arrayHeading}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ForeignBankAccount;
