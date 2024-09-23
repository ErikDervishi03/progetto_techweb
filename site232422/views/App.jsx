import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Home.jsx"
import Login from "./Login.jsx"
import Register from "./Register.jsx"

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        fetch("/api/auth-check")
            .then(res => res.json())
            .then(data => {
                if(data.authenticated) {
                    setAuthenticated(true)
                }
                else {
                    setAuthenticated(false)
                }
            })
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login setAuthenticated={setAuthenticated}/> } />
                <Route path="/register" element={authenticated ? <Navigate to="/" /> : <Register /> } />
                <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    )

    // return(
    //     <Login setAuthenticated={setAuthenticated}></Login>
    // )
}

export default App;