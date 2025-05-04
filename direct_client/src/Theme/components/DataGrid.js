export const MuiGrid = {
  styleOverrides: {
    root: {
      "& .MuiDataGrid-root": {
        padding: "15px 15px 5px 15px",
      },
      "&.MuiDataGrid-root": {
        border: "none !important",
        borderWidth: "none !important",
        outline: "none",
      },
      "& .MuiDataGrid-toolbarContainer .MuiButton-root": {
        color: "#494949",
        background: "#e5e7eb",
        padding: "8px 16px",
        "&:hover": {
          color: "#494949",
          background: "#f1f1f1",
        },
      },
    },
  },
};
