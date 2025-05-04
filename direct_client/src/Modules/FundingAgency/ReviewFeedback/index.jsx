import { Card, Grid, Stack, styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import MainHeadings from "@common/AnimationMui/MainHeadings";
import { BackArrowButtonComp } from "@common/MUI";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import IconsHeadings from "@common/AnimationMui/IconHeadings";
import { Description } from "@mui/icons-material";
import DisplayDes from "./DisplayDes";
import TypographyMUI from "@common/MUI/TypographyMUI";
import { Spinner } from "@common/UI";
import { useAxios } from "@hooks";
const StyledDiv = styled("div")({
  "& table, & th, & td, & tbody": {
    border: "1px solid black",
  },
  "& td": {
    padding: 8,
  },
  "& table": {
    width: "100%",
  },
  "& thead": {
    backgroundColor: "grey",
  },
});
function ReviewFeedback() {
  const { id } = useParams();
  const { loading, data } = useAxios("feedback/getFeedback", "POST", {
    feedbackID: id,
  });

  const FeedbackData = data?.result ?? [];

  let sanitizedHTML;
  if (FeedbackData?.summary) {
    sanitizedHTML = DOMPurify.sanitize(FeedbackData?.summary);
  }

  return (
    <Grid container mt={6} mb={6} gap={4}>
      <Spinner isLoading={loading} />
      <Grid item xs={12}>
        <BackArrowButtonComp
          marginBottom={"10px"}
          marginTop={"10px"}
          route={`/directportal/dashboard/`}
        />
      </Grid>
      <Grid item xs={12}>
        <MainHeadings text={"FeedBack"} />
      </Grid>
      <Grid item xs={12} display={"flex"} alignItems={"center"} gap={2}>
        {FeedbackData?.rating && (
          <>
            <Rating name="read-only" value={1} readOnly />
            <TypographyMUI variant={"body1"} text={FeedbackData?.rating} />
          </>
        )}
      </Grid>
      <Grid item xs={12}>
        {sanitizedHTML && (
          <Card elevation={4} sx={{ p: 3 }}>
            <Stack direction={"column"} gap={1}>
              <IconsHeadings
                text={"Feedback Summary"}
                icons={<Description sx={{ color: "#252B42" }} />}
              />
              <StyledDiv dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </Stack>
          </Card>
        )}
      </Grid>
      {FeedbackData?.feedbackDetails?.proposalText.length > 0 &&
        FeedbackData?.feedbackDetails?.proposalText?.map((e, i) => {
          console.log(e, "e");
          return (
            <Grid item xs={12}>
              <DisplayDes
                heading={e?.heading}
                content={e?.content}
                feedback={e?.feedback}
                rating={e?.rating}
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ReviewFeedback;
