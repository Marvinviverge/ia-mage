import React, { createContext, useContext, useState } from 'react';
import { isLogged, logout, loginUser, signupUser, saveToken, updateUser } from './account.service';
import Axios from './caller.service'
import Swal from 'sweetalert2'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(isLogged());

  const handleLogin = (formData, navigate) => {
    try {
      loginUser(formData)
        .then(response => {
          setIsUserLogged(true);
          saveToken(response.data.token);
          navigate("/", { replace: true });
          Swal.fire({
            title: "Connexion réussie",
            icon: "success",
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
          })
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            title: "Veuillez entrer une adresse mail et/ou un mot de passe valide",
            icon: "error",
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
          })
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserLogged(false);
    Swal.fire({
      title: "Vous êtes déconnectés... à bientôt !",
      icon: "success",
      toast: true,
      timer: 1000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
      showCancelButton: true,
    })
  };

  const handleSignup = (formData, navigate) => {
    try {
      signupUser(formData)
        .then(response => {
          navigate("/auth", { replace: true });
          Swal.fire({
            title: "Inscription réussie, connectez-vous maintenant !",
            icon: "success",
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
          })
        })
        .catch(error => {
          Swal.fire({
            title: "Oops ! Une erreur s'est produite: " + error,
            icon: "error",
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
          })
          console.log(error);
        });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Oops ! Une erreur s'est produite: " + error.response,
          icon: "error",
          toast: true,
          timer: 1000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
          showCancelButton: true,
        })
        console.log(error.response.data.msg);
      }
    }
  };

  const handleUpdateToken = async (formData ) => {
    
    const response = await updateUser(formData)
    Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    localStorage.setItem('token', response.data.token);
    return response.data.token

  };

  return (
    <AuthContext.Provider value={{ isUserLogged, updateToken: handleUpdateToken, login: handleLogin, logout: handleLogout, signup: handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};
