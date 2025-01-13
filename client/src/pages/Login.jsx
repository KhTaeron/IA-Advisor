/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRef } from "react";
import { useState } from "react";
import { FormHelperText } from "@mui/material";
import { useEffect } from "react";
import userStore from "../utils/userStore";

const defaultTheme = createTheme();

export default observer(function Login() {
  const navigate = useNavigate();
  const [onProcessing, setOnProcessing] = useState(false);
  const formSigninRef = useRef();

  useEffect(() => {
    if (userStore.user) {
      navigate("/");
    }
  }, [navigate, userStore.user]);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (!username) {
      setErrors("Le pseudo est obligatoire.");
      return false;
    }

    if (!password) {
      setErrors("Le mot de passe est obligatoire.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOnProcessing(true);
    setErrors("");

    if (handleValidation()) {
      const { username, password } = values;
      const result = await userStore.login(username, password);

      if (result.success) {
        navigate("/");
      } else {
        setErrors(result.message);
      }
    }
    setOnProcessing(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box
            component="form"
            ref={formSigninRef}
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Pseudo"
              name="username"
              autoComplete="username"
              disabled={onProcessing}
              autoFocus
              onChange={handleChange}
              error={!!errors}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="password"
              disabled={onProcessing}
              onChange={handleChange}
              error={!!errors}
            />
            <FormHelperText error>{errors}</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={onProcessing}
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
          </Box>
          <Link to="/register">Vous n'avez pas de compte ?</Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
});
