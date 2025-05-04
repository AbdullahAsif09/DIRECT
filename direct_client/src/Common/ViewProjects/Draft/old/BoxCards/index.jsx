import { CalendarToday, DeleteOutline, Publish } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
const DateTypography = styled(Typography)(({ theme }) => ({
  color: "#2196F3",
}));
const CardContentContainer = styled(CardContent)(({ theme }) => ({
  display: "block",
  width: "100%",
}));

const ButtonPublish = styled(Button)(({ theme }) => ({
  paddingInline: "20px",
  backgroundColor: "#33324E",
  border: "13px solid green",
  borderColor: "#33324E",
  color: "white",
  border: "none",
  "&:hover": {
    borderColor: "#33324E",
    color: "white",
    backgroundColor: "#33324E",
  },
}));
const ButtonPublishContainer = styled(ButtonGroup)(({ theme }) => ({
  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
    borderColor: "#414063",
  },
}));
function BoxCards() {
  return (
    <Card sx={{ width: "90%", margin: "0 auto 20px auto" }} elevation={4}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContentContainer>
        <DateTypography
          fontWeight={600}
          gutterBottom
          variant="body2"
          component="div"
        >
          Date Day and Year
        </DateTypography>
        <Typography
          variant="h3"
          noWrap
          textOverflow={"ellipsis"}
          color="text.secondary"
        >
          Lizards are a widespread group of squamate reptiles
        </Typography>
        <Divider
          sx={{
            marginTop: "10px",
            marginBottom: "15px",
            backgroundColor: "#C0C0C0",
          }}
        />
        <Typography textAlign={"justify"} variant="body1">
          Lizards are a widespread group of squamate reptiles Lizards are a
          widespread group of squamate reptilizards are a widespread group of
          squamate reptiles
        </Typography>
      </CardContentContainer>
      <CardActions>
        <Grid container justifyContent={"space-between"} aligItems={"center"}>
          <ButtonPublish size="small" startIcon={<Publish />}>
            Publish
          </ButtonPublish>
          <IconButton color="error">
            <DeleteOutline />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default BoxCards;
