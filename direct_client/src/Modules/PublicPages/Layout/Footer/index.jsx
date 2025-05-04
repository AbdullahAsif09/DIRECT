import { Stack } from "@mui/system";
import { styled } from "@mui/material/styles";
import { LogoWrapperFull } from "@common/Logo";
import { SectionContainer } from "@common/UI";
const FooterContainer = styled("footer")(({ theme }) => ({
  background: theme.palette.bg.white,
}));

const Footer = () => {
  return (
    <SectionContainer style={{ paddingBottom: "1rem" }}>
      <FooterContainer>
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          mt={"-2rem"}
          gap={"2rem"}
        >
          <LogoWrapperFull height={"80px"} width={"80px"} />
        </Stack>
      </FooterContainer>
    </SectionContainer>
  );
};

export default Footer;
