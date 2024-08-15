
import React from 'react';
import { Outlet, useNavigate } from "react-router-dom"
import ResultPage from './ResultPage';
import { useContext,useEffect } from "react";
import { AuthContext } from '../Context/AuthContext';
const PrivateRoute = () =>{
    const { isAuthenticated, currentUser, checkAuth } = useContext(AuthContext);

    // const navigate = useNavigate();

    // useEffect(() => {
    //     checkAuth(); // Gọi lại hàm checkAuth mỗi khi PrivateRoute được render
    // }, [navigate]);
    if (isAuthenticated === false) {
		return <ResultPage />;
	}

	return <Outlet />;
}

export default PrivateRoute