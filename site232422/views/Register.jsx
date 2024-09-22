import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        realname: '',
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gestisci l'invio del form qui, ad esempio invia i dati al server
        console.log('Dati del form:', formData);
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
                        value={formData.realname}
                        onChange={handleChange}
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
                        value={formData.username}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Inserisci la tua password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary center">Registrati</button>
            </form>
        </div>
    )
}

export default Register