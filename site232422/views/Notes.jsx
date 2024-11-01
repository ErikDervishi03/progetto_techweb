import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/style/Notes.css';

const Notes = () => {
    const [notes, setNotes] = useState([]);  

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/notes');
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error("Errore nel recuperare le note:", error);
            }
        };
        fetchNotes();
    }, []);

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Rimuovi la nota dallo stato locale
                setNotes(notes.filter((note) => note._id !== id));
            } else {
                console.error("Errore durante l'eliminazione della nota");
            }
        } catch (error) {
            console.error("Errore nella richiesta di eliminazione:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                {/*<h1 className="text-center">App di Note</h1>*/}
                <div className='notes-grid'>
                    {notes.map((note) => (
                        <div >
                            <div className="note-item" key={note._id}>
                                <div className="notes-header">
                                    <i class="bi bi-pencil"></i>
                                    <button onClick={() => deleteNote(note._id)}>x</button>
                                </div>
                                <h2>{note.obj}</h2>
                                <p>{note.startingDate}</p>
                                <p>{note.endingDate}</p>
                                <p>{note.prio}</p>
                                <p>{note.category}</p>
                                <ReactMarkdown>{note.content}</ReactMarkdown> 
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Link to="/form" type="submit" className="btn btn-primary fixed-bottom me-3 mb-3 rounded-3 note-button">
                <i className="bi bi-plus-circle"></i> Crea Nuova Nota
            </Link>
        </>
    );
}

export default Notes;

