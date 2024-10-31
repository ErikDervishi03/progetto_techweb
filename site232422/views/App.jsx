import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Home.jsx"
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import Calendar from "./Calendar.jsx"
import Notes from "./Notes.jsx"
import Pomodoro from "./Pomodoro.jsx"
import NotesForm from './NotesForm.jsx';

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect( () => {
        async function fetchData() {
            await fetch("/api/auth-check")
                .then(res => res.json())
                .then(data => {
                    if(data.authenticated) {
                        setAuthenticated(true)
                    }
                    else {
                        setAuthenticated(false)
                    }
                })
        }
        fetchData()
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login setAuthenticated={setAuthenticated}/> } />
                <Route path="/register" element={authenticated ? <Navigate to="/" /> : <Register setAuthenticated={setAuthenticated}/> } />
                <Route path="/calendar" element={authenticated ? <Calendar /> : <Navigate to="/login" />} />
                <Route path="/notes" element={authenticated ? <Notes /> : <Navigate to="/login" />} />
                <Route path="/form" element={authenticated ? <NotesForm /> : <Navigate to="/login" />} />
                <Route path="/pomodoro" element={authenticated ? <Pomodoro /> : <Navigate to="/login" />} />
                <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    )
}

export default App;