import { styled, Avatar, Box } from "@mui/material";
import { keys } from "@config";
import { useWindowSize } from "@hooks";

const StyledSpan = styled("span")(({ theme }) => ({
  position: "absolute",
  top: "0",
  right: "0",
  paddingBottom: 4,
  cursor: "pointer",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.3)",
  borderRadius: "50%",
  width: 30,
  height: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "15px",
  textAlign: "center",
  lineHeight: "20px",
  zIndex: "1",
}));

export const AvatarStyled = ({ src, setSrc }) => {
  const isString = typeof src === "string";
  const isFile = src instanceof File;
  const uploadedSrc = keys.rootserver + src;
  const localSrc = () => URL.createObjectURL(src);
  const newSrc = isString ? uploadedSrc : isFile ? localSrc() : null;
  const width = useWindowSize();
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        marginBottom: isString ? -50 : undefined,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <label htmlFor="file">
        <Avatar
          slotProps={{
            img: {
              sx: {
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                marginTop: "-12px",
              },
            },
          }}
          sx={{
            width: "200px",
            height: "200px",
            cursor: "pointer",
            marginLeft: width >= 900 ? "20px" : 0,
            backgroundColor: "rgba(0,0,0,)",
          }}
          src={newSrc}
        />
      </label>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          setSrc(file);
        }}
      />
      {isFile ? (
        <StyledSpan
          onClick={() => {
            setSrc(isString ? uploadedSrc : null);
          }}
        >
          x
        </StyledSpan>
      ) : null}
    </Box>
  );
};
