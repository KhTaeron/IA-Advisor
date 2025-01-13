import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import userStore from "../utils/userStore";

const AppLoader = observer(({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userStore.loadUserFromLocalStorage(); 
    setLoading(false); 
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return children;
});

export default AppLoader;
