
import { createContext, useEffect, useState } from "react";
import baseAPIService from "../Service/baseAPIService";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const checkAuth = async() =>{
        const token = localStorage.getItem("token");
        if(token){
            try{
                console.log("CheckAuth")
                const {data} = await baseAPIService.get("/checklogin", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const user = {
                    id: data.id,
                    username: data.username
                };
                setCurrentUser(user);
                setIsAuthenticated(true);
            } catch(error){
                console.error(error);
                setIsAuthenticated(false)
                setCurrentUser(null);
            }
        }
        else{
            console.log("Chua co token")
        }
    };
    useEffect(() =>{
        checkAuth();
    }, [])


    const login = async (user) =>{
        try{
            const {data} = await baseAPIService.post("/login", user);
            localStorage.setItem("token", data.token);
            const userResponse = {
                id: data.id,
                username: data.username
            };
            setCurrentUser(userResponse)
            setIsAuthenticated(true);
        } catch(error){
            console.error(error);
            setIsAuthenticated(false);
            setCurrentUser(null)
        }
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setCurrentUser(null);
        setIsAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, currentUser, login, logout, checkAuth}}>{children}</AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node
  };
  

export default AuthContextProvider