import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";
import React from "react";

export function Skeletons({ sx = {} }) {
  return (
    <Card elevation={4} sx={{ minHeight: "418px", ...sx }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={null}
        title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton height={10} width="40%" />}
      />

      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
      <CardActions>
        <Skeleton
          sx={{ ml: 1, mt: -2 }}
          animation="wave"
          height={60}
          width="30%"
        />
      </CardActions>
    </Card>
  );
}
