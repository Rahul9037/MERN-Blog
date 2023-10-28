import { useState } from "react"

export default function Register(){

    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');

    const Register = async (e) => {
        e.preventDefault();
        let response = await fetch('http://localhost:4000/register' , {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: { 'Content-Type': 'application/json'}
        })
        if(response.status !== 200){
            alert("User Registartion failed")
        }
        else{
            alert("User Registartion success")
        }
    }

    return (
        <form className="register" onSubmit={Register}>
            <h1>Register</h1>
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
            <button>Register</button>
        </form>
    )
}