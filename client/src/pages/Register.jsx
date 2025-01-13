/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import userStore from "../utils/userStore";

const defaultTheme = createTheme();

export default observer(function Register() {
  const navigate = useNavigate();
  const [onProcessing, setOnProcessing] = useState(false);
  const formSigninRef = useRef();

  // Vérification du jeton à l'initialisation du composant
  useEffect(() => {
    if (userStore.user) {
      navigate("/");
    }
  }, [navigate, userStore.user]);

  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleValidation = () => {
    const { username, password, confirmPassword } = values;
    const newErrors = {};
    const passwordRegex = /^[a-zA-Z0-9_\-;:%.*#<>$?+-]{8,100}$/;

    if (username.length < 3) {
      newErrors.username = "Le pseudo doit faire plus de 3 lettres.";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Le mot de passe doit faire entre 8 et 100 caractères et contenir uniquement des caractères autorisés.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOnProcessing(true);
    if (handleValidation()) {
      // Appel de la méthode registerUser du store
      await userStore.registerUser(
        values,
        setErrors,
        setOnProcessing,
        navigate
      );
    } else {
      setOnProcessing(false);
    }
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
            S'inscrire
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
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
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
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Vérifiez votre mot de passe"
              type="password"
              id="confirmPassword"
              disabled={onProcessing}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={onProcessing}
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
          </Box>
          <Link to="/login">Vous avez déjà un compte ?</Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
});
