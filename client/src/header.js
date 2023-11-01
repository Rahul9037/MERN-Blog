import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";

export default function Header(){

    const {setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        let token = sessionStorage.getItem('accessToken');
        if(token){
            const headers = { 'Authorization': `Bearer ${token}` };
            fetch('http://localhost:4000/api/profile' , {
                headers,
                //credentials: 'include'
            })
            .then(resp => resp.json())
            .then(userInfo => { console.log("userInfo",userInfo); setUserInfo(userInfo)})
        }
    },[])

    const logout = () => {
        fetch('http://localhost:4000/api/logout' , {
            //credentials: 'include',
            method: 'POST'
        })
        sessionStorage.clear();
        setUserInfo(null)
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">My Blog</Link>
            {username && 
                <nav>
                    <Link to="/create">Create New Post</Link>
                    <a onClick={logout}>Logout</a>
                </nav>
            }
            {!username && 
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            }   
        </header>
    )
}