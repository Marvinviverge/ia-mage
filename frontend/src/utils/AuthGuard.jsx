import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import {isLogged, getToken, tokenDecode} from "./account.service.js";

// fonction de blocage de route
const AuthGuard = ({ children }) => {

    if (!isLogged()) {
        return <Navigate to="/auth" />;
    }
    return children;
};

export default AuthGuard;
