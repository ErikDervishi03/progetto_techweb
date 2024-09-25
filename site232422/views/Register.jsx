import React, { useState } from 'react';
import {Link} from 'react-router-dom';

//function Register() {
const Register = ({setAuthenticated}) => {
    const [realname, setRealname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/newreg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({realname, username, password})
        })

        const data = await res.json()

        if(data.success) {
            setAuthenticated(true)
        }
        else {
            setError(data.message)
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="realname" className="form-label">Nome e Cognome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="realname"
                        name="realname"
                        value={realname}
                        onChange={(e) => setRealname(e.target.value)}
                        placeholder="Inserisci il tuo nome e cognome"
                        required
                    />
                </div>

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

                <button type="submit" className="btn btn-primary center">Registrati</button>
            </form>
            {error && <p>{error}</p>}

            <p>Hai gia' un account? <Link to="/login">Fai l'accesso</Link></p>
        </div>
    )
}

export default Register