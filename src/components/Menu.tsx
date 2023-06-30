import { Box, styled } from "@mui/material";

const Menu = () => {
  return <Aside></Aside>;
};

const Aside = styled(Box)`
  width: 100px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Menu;
