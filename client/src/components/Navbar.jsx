import React from "react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import userStore from "../utils/userStore";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Navbar = observer(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore.logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Advisor
            </Link>
          </Typography>
          {userStore.user ? (
            <Box>
              <Button color="inherit" onClick={handleLogout}>
                Déconnexion
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Inscription
              </Button>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Connexion
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
});

export default Navbar;
