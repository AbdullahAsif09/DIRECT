import { Button } from "@mui/material";
import { customTheme } from "@theme/theme";
import { Download } from "@mui/icons-material";

function AdminDownloadBtn({ file }) {
  const handleDownload = (file) => {
    const blob = new Blob([file.content], { type: file.type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.fileName || "download";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return (
    <Button
      onClick={() => handleDownload(file)}
      sx={{
        backgroundColor: customTheme.palette.bg.lightPurple,
        "&:hover": {
          backgroundColor: customTheme.palette.bg.lightPurple,
        },
      }}
      size="small"
      variant="contained"
      startIcon={<Download />}
    >
      Download
    </Button>
  );
}

export default AdminDownloadBtn;
