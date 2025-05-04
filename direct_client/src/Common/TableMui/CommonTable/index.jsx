import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E6E6E6;",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function CommonTable({ headerHeading, contentData, tableData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" width={100}>
              No.
            </StyledTableCell>
            {headerHeading.map((e, i) => (
              <StyledTableCell key={i} align="center">
                {e}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(tableData) ? (
            tableData?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  align="center"
                  width={100}
                  component="th"
                  scope="row"
                >
                  {index + 1}
                </StyledTableCell>
                {Object.keys(row).map((e, i) => (
                  <StyledTableCell width={600} align="center">
                    {row[e]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell
                align="center"
                width={100}
                component="th"
                scope="row"
              >
                0
              </StyledTableCell>
              {headerHeading.map((e, i) => (
                <StyledTableCell align="center">No Data Found</StyledTableCell>
              ))}
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommonTable;
