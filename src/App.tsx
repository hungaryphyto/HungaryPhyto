import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Button from "@mui/material/Button";
import "@fontsource/roboto/700.css";
import { TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [nameIsFocus, setNameIsFocus] = useState(false);
  const [emailIsFocus, setEmailIsFocus] = useState(false);
  const [passwordIsFocus, setPasswordIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleFocus = (setFunction: Function) => {
    setTimeout(() => setFunction(true), 100);
  };

  const handleBlur = (setFunction: Function) => {
    setFunction(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (
    setFunction: Function,
    value: string,
    setError: Function,
    error: boolean
  ) => {
    error && setError(false);
    setFunction(value);
  };
  const validateName = (name: string) => {
    // Aqui você pode adicionar suas regras de validação para o campo de nome
    if (name.trim() === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const validateEmail = (email: string) => {
    // Aqui você pode adicionar suas regras de validação para o campo de e-mail
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = (password: string) => {
    // Aqui você pode adicionar suas regras de validação para o campo de senha
    if (password.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validação dos campos antes do envio
    validateName(name);
    validateEmail(email);
    validatePassword(password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            id="name"
            label={nameError ? "ERROR" : "Name"}
            variant="outlined"
            onFocus={() => handleFocus(setNameIsFocus)}
            onBlur={() => handleBlur(setNameIsFocus)}
            error={nameError}
            value={name}
            onChange={(event) =>
              handleChange(setName, event.target.value, setNameError, nameError)
            }
            autoComplete="off"
            InputProps={{
              startAdornment: nameIsFocus && (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            id="email"
            label={emailError ? "ERROR" : "Email"}
            variant="outlined"
            onFocus={() => handleFocus(setEmailIsFocus)}
            onBlur={() => handleBlur(setEmailIsFocus)}
            error={emailError}
            value={email}
            onChange={(event) =>
              handleChange(
                setEmail,
                event.target.value,
                setEmailError,
                emailError
              )
            }
            autoComplete="off"
            InputProps={{
              startAdornment: emailIsFocus && (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            id="password"
            label={passwordError ? "ERROR" : "Password"}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            onFocus={() => handleFocus(setPasswordIsFocus)}
            onBlur={() => handleBlur(setPasswordIsFocus)}
            error={passwordError}
            value={password}
            onChange={(event) =>
              handleChange(
                setPassword,
                event.target.value,
                setPasswordError,
                passwordError
              )
            }
            autoComplete="off"
            InputProps={{
              startAdornment: passwordIsFocus && (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledButton type="submit" variant="contained">
            Sign Up
          </StyledButton>
        </form>
      </Main>
    </ThemeProvider>
  );
}

const Main = styled(Box)`
  width: 100dvw;
  height: calc(100dvh - 150px);
  padding: 20px;
  background-color: #202020;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    border: 2px dashed #ff4081;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
  }
`;

const StyledTextField = styled(TextField)`
  margin: 5px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin: 5px;
  width: 100%;
`;

export default App;
