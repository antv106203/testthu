
import { useState } from "react"
import '../CSS/Login.css'
import { useNavigate } from 'react-router';
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

function Login(){
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const {login} = useContext(AuthContext);

    const handleChangeInput = (event) =>{
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleCLickLogin = async() =>{
        try{
            await login(user);
            navigate("/")

        }
        catch(err){
            console.error('Login error:', err);
        }

    }
    return(
        <div className="contain">
            <div className="login">

                <div className="user-pass">
                    <input placeholder="Username" type="text"
                        name="username"
                        value={user.username}
                        onChange={(event) => {handleChangeInput(event)}}
                    />
                    <input placeholder="Password" type="password"
                        name="password"
                        value={user.password}
                        onChange={(event) => {handleChangeInput(event)}}
                    />
                </div>

                <div className="btn-login">
                    <button onClick={ handleCLickLogin}>Đăng nhập</button>
                </div>
            </div>
        </div>
        
    )
}

export default Login