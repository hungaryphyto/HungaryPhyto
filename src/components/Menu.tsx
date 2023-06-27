import { Box, styled } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const Menu = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    console.log(user)

  return (
    <Aside>
      {isAuthenticated ? (
        <StyledButton variant="contained" onClick={() => logout()}>Logout</StyledButton>
      ) : (
        <StyledButton variant="contained" onClick={() => loginWithRedirect()}>Login</StyledButton>
      )}
    </Aside>
  );
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

const StyledButton = styled(Button)`
  width: 100%;
`;

export default Menu;
