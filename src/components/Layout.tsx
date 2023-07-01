import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import useWindowSize from "../hooks/useWindowSize.ts";
import WhatsAppButton from './WhatsAppButton.tsx';

const Layout = () => {
  const { height } = useWindowSize();
  const absolute = height === undefined ? "true" : (height >= 650).toString();

  return (
    <Container>
      {absolute === "true" && <Header absolute={absolute} />}
      <Main absolute={absolute}>
        <Outlet />
      </Main>
      <WhatsAppContainer>
        <WhatsAppButton />
      </WhatsAppContainer>
    </Container>
  );
};

interface MainProps {
  absolute?: string;
}

const WhatsAppContainer = styled(Box)`
  position: absolute;
  bottom: 15px;
  z-index: 1;
  right: 15px;
  background-color: #013501;
  border-radius: 50%;
  margin: 5px;
  padding: 2px;
`

const Container = styled(Box)`
  width: 100dvw;
  height: 100dvh;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const Main = styled(Box)<MainProps>`
  position: ${(props) => (props.absolute === "true" ? "absolute" : "static")};
  bottom: 0;
  width: 100dvw;
  height: ${(props) =>
    props.absolute === "false" ? "100dvh" : "calc(100dvh - 150px)"};
  padding: 20px;
  background-color: #202020;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default Layout;
