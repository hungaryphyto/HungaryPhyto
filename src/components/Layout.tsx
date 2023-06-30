import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled(Box)`
  width: 100dvw;
  height: calc(100dvh - 150px);
  padding: 20px;
  background-color: #202020;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Layout;
