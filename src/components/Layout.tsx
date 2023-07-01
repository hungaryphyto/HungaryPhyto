import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const Layout = () => {
  
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled(Box)`
  width: 100dvw;
  height: 100dvh;
  position: relative;
`
const Main = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100dvw;
  height: calc(100dvh - 150px);
  padding: 20px;
  background-color: #202020;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 20px;
  margin-top: 20px;
`;

export default Layout;
