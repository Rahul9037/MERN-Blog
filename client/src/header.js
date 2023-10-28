import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContest } from "./UserContext";

export default function Header(){

    const {setUserInfo, userInfo } = useContext(UserContest);

    useEffect(() => {
        fetch('http://localhost:4000/profile' , {
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(userInfo => setUserInfo(userInfo))
    },[])

    const logout = () => {
        fetch('http://localhost:4000/logout' , {
            credentials: 'include',
            method: 'POST'
        })
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