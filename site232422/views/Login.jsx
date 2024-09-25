import React, { useState } from 'react';
import {Link} from 'react-router-dom';

//??????? perche non va se scrivo function
const Login = ({ setAuthenticated }) =>  {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })
      
        const data = await res.json();
      
        if (data.success) {
            setAuthenticated(true)
        }
        else {
            setError(data.message)
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Inserisci il tuo username"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Inserisci la tua password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary center">Accedi</button>
            </form>
            {error && <p>{error}</p>}

            <p>Non hai un account? <Link to="/register">Registrati</Link></p>
        </div>
    )
}

export default Login
