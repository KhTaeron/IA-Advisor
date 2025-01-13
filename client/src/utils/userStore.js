import { makeAutoObservable } from "mobx";
import { loginRoute, registerRoute } from "../services/APIService";
import axios from "axios";

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromLocalStorage();
  }

  loadUserFromLocalStorage() {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        this.user = parsedUser;
      }
    } catch (error) {
      console.error(
        "Erreur lors du chargement de l'utilisateur depuis le localStorage :",
        error
      );
      this.user = null;
    }
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  async login(username, password) {
    try {
      const { data } = await axios.post(loginRoute, { username, password });

      if (data.status === true) {
        const userWithToken = { ...data.user, token: data.token };
        this.setUser(userWithToken);
        return { success: true };
      } else {
        return { success: false, message: data.msg };
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return {
        success: false,
        message: "Une erreur est survenue lors de la connexion.",
      };
    }
  }

  async registerUser(values, setErrors, setOnProcessing, navigate) {
    this.isLoading = true;
    try {
      const { username, password } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        password,
      });

      if (data.status === false) {
        setErrors({
          ...this.errors,
          [data.field]: data.msg,
        });
      } else if (data.status === true) {
        navigate("/login"); 
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    } finally {
      this.isLoading = false;
      setOnProcessing(false);
    }
  }

  logout() {
    this.user = null;
    localStorage.removeItem("user");
  }
}

const userStore = new UserStore();
export default userStore;
