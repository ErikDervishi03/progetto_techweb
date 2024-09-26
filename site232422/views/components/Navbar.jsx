import React, {useState, useEffect} from 'react';
import { Link, redirect } from 'react-router-dom';

const Navbar = () => {
    const [username, setUsername] = useState('')

    const getUsername = async() => {
        const res = await fetch('/api/auth-check')
        const data = await res.json()
        setUsername(data.user.username)
    }

    useEffect(() => {
        getUsername()
    }, [])

    const handleLogout = async() => {
        await fetch('/api/logout')
        location.replace("/")
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Selfie</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/notes">Note</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/calendar">Calendario</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pomodoro">Pomodoro</Link>
                        </li>
                    </ul>

                    <div className="dropdown ms-auto">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {username}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li className="dropdown-item text-muted">{username}</li>
                            <li>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

