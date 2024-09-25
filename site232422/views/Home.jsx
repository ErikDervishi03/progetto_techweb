import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Navbar from './components/Navbar.jsx'

function Home() {
    return(
        <>
            <Navbar></Navbar>
            <h1>Home</h1>
        </>
    )
}

export default Home
