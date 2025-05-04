import { DeleteOutline } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useEffect } from "react";
import { useState } from "react";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    border: "1px solid lightgray",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableMui({
  values,
  sectionName,
  remove,
  errors,
  touched,
  handleBlur,
  handleChange,
  headerArray,
  AddState,
  setAddState,
  setDisableBtn,
  DisableBtn,
}) {
  const [RowArray, setRowArray] = useState(Array(AddState).fill(null));
  const [RealArray, setRealArray] = useState(
    Array(headerArray.length).fill(null)
  );
  const handleChangeTextField = (event, e, i, indexMain) => {
    let arrayd = RealArray;
    let obj = {
      key: i,
      name: e,
      value: event.target.value,
    };
    const fi = arrayd.map((eve, index) => {
      return index === i ? obj : eve;
    });
    setRealArray(fi);

    const final = Rows.map((ev, index) => {
      return index === indexMain ? RealArray : ev;
    });
  };
  // console.log(headerArray.length, "length");
  // console.log(arrayd, "RealArray");
  const Rows = Array(AddState).fill(null);
  // console.log(AddState, "AddState");
  return (
    <div>
      <TableContainer sx={{ mt: 0 }} component={Paper}>
        <Table sx={{ minWidth: 1300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell center align="center">
                No.
              </StyledTableCell>
              {headerArray.map((e, i) => {
                return (
                  <StyledTableCell align="center" key={i}>
                    {e}
                  </StyledTableCell>
                );
              })}
              <StyledTableCell center align="center">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(values) &&
              values?.map((row, indexMain) => (
                <StyledTableRow key={indexMain}>
                  <StyledTableCell
                    width={100}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {indexMain + 1}
                  </StyledTableCell>
                  {Object.keys(row)?.map((e, i) => (
                    <StyledTableCell align="center" key={i}>
                      <TextField
                        placeholder={e}
                        required
                        value={values[indexMain][e]}
                        name={`${sectionName}[${indexMain}]${e}`}
                        onChange={handleChange}
                        id={e}
                        fullWidth
                      />
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="center">
                    <IconButton
                      disabled={values.length === 1 ? true : false}
                      onClick={() => remove(indexMain)}
                      color="error"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableMui;

{
  /* {headerArray.map((e, i) => (
                  <StyledTableCell align="center" key={i}>
                    <TextField
                      placeholder={e}
                      required
                      // value={RealArray[i]?.value}
                      onChange={(event) =>
                        handleChangeTextField(event, e, i, indexMain)
                      }
                      // onChange={(event) => {
                      //   event.preventDefault();
                      //   let arrayd = RealArray;
                      //   let obj = {
                      //     key: i,
                      //     name: e,
                      //     value: event.target.value,
                      //   };
                      //   const fi = arrayd.map((eve, index) => {
                      //     return index === i ? obj : eve;
                      //   });
                      //   setRealArray(fi);
                      //   const final = Rows.map((event, index) => {
                      //     return index === indexMain ? RealArray : event;
                      //   });
                      //   console.log(final, "RealArray in fun");
                      //   Rows.push(final);
                      //   console.log(Rows, "Rows");
                      // }}
                      fullWidth
                    />
                  </StyledTableCell>
                ))} */
}
