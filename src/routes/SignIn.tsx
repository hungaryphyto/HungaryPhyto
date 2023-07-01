import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import "@fontsource/roboto/700.css";
import { TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

function SignIn() {
  const { width } = useWindowSize();

  const [emailIsFocus, setEmailIsFocus] = useState(false);
  const [passwordIsFocus, setPasswordIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);

  const emailErrorMsg = "Email inválido";
  const passwordErrorMsg = "Senha com mínimo de 6 caracteres";

  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [axiosSuccess, setAxiosSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

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

  const validateEmail = (email: string) => {
    // Aqui você pode adicionar suas regras de validação para o campo de e-mail
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailHasError(true);
      return false;
    } else {
      setEmailHasError(false);
      return true;
    }
  };

  const validatePassword = (password: string) => {
    // Aqui você pode adicionar suas regras de validação para o campo de senha
    if (password.length < 6) {
      setPasswordHasError(true);
      return false;
    } else {
      setPasswordHasError(false);
      return true;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      // Validação dos campos antes do envio
      const isValidEmail = validateEmail(email);
      const isValidPassword = validatePassword(password);

      if (!isValidEmail || !isValidPassword) return;
      const body = { email, password };

      await axiosPrivate.post("/signin", body);

      setAxiosSuccess(true);
      setErrMsg("Signed in");
      setTimeout(() => navigate("/", { replace: true }), 3500);
    } catch (err: any) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.response?.status === 400) {
        setErrMsg("Faltando nome, email e/ou senhas");
      } else if (err.response?.status === 401) {
        setErrMsg("Não autorizado");
      } else if (err.response?.status === 409) {
        setErrMsg("E-mail em uso");
        window.alert("E-mail em uso");
      } else {
        setErrMsg("Falha ao criar a conta");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
    setTimeout(() => setErrMsg(""), 500);
  };
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);
  useEffect(() => {
    errMsg ? setShowSnackbar(true) : setShowSnackbar(false);
  }, [errMsg]);

  return (
    <Main wsize={width}>
      <form onSubmit={handleSubmit}>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transitionDuration={500}
          action={<Button onClick={handleSnackbarClose}>Close</Button>}
        >
          <Alert
            severity={axiosSuccess ? "success" : "error"}
            onClose={handleSnackbarClose}
            sx={{ width: "100%" }}
          >
            {errMsg}
          </Alert>
        </Snackbar>

        <StyledTextField
          id="email"
          ref={emailRef}
          disabled={isLoading}
          label={emailHasError ? "ERROR" : "Email"}
          variant="outlined"
          onFocus={() => handleFocus(setEmailIsFocus)}
          onBlur={() => handleBlur(setEmailIsFocus)}
          error={emailHasError}
          helperText={emailHasError && emailErrorMsg}
          value={email}
          onChange={(event) =>
            handleChange(
              setEmail,
              event.target.value,
              setEmailHasError,
              emailHasError
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
          disabled={isLoading}
          label={passwordHasError ? "ERROR" : "Password"}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          onFocus={() => handleFocus(setPasswordIsFocus)}
          onBlur={() => handleBlur(setPasswordIsFocus)}
          error={passwordHasError}
          helperText={passwordHasError && passwordErrorMsg}
          value={password}
          onChange={(event) =>
            handleChange(
              setPassword,
              event.target.value,
              setPasswordHasError,
              passwordHasError
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
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <StyledButton type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? (
            <ThreeDots
              height="45"
              width="80"
              radius="15"
              color="#1072f1"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            "Sign In"
          )}
        </StyledButton>
      </form>
    </Main>
  );
}

interface MainProps {
  wsize?: number;
}

const Main = styled(Box)<MainProps>`
  form {
    border: 2px dashed #ff4081;
    width: ${(props) =>
      (props.wsize ?? 0) >= 500 ? 500 : (props.wsize ?? 0) - 20}px;
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
  height: 45px;
`;

export default SignIn;
