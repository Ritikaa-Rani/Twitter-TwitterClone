// import React from 'react'
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom"
import {useUserAuth} from "../context/useUserAuth"

const ProtectedRoute = ({ children }) => {
    const { user } = useUserAuth();

    // console.log("Check user in Private: ", user);
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node, // Ensure children is a React node and required
};

export default ProtectedRoute