import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import { styled } from "@mui/material";

const Layout = () => {
  const Layout = styled("div")(() => ({}));
  const DIV = styled("div")(() => ({
    height: "auto",
    minHeight: "500px",
  }));
  //
  return (
    <Layout>
      <Navbar />
      <DIV>
        <Outlet />
      </DIV>
      <Footer />
    </Layout>
  );
};

export default Layout;
