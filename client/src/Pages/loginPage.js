import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContest } from "../UserContext";

export default function Login(){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [error,setError] = useState(false);
    const { setUserInfo } = useContext(UserContest);

    const Login = async (e) => {
        e.preventDefault();
        let response = await fetch('http://localhost:4000/login' , {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include'
        })
        if(response.status == 200){
            let userDetails = await response.json();
            setUserInfo(userDetails);
            setRedirect(true)
        }
        else{
            let error = await response.json();
            setRedirect(false);
            setError(error?.message)
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <form className="login" onSubmit={Login}>
                <h1>Login</h1>
                <input 
                    type="text" 
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login</button>
            </form>
            {error && <span className="error-message">{error}</span>}
        </>
    )
}