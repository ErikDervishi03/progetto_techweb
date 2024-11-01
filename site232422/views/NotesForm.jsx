import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './components/Navbar.jsx';
import ReactMarkdown from 'react-markdown';


function NotesForm() {
    const [obj, setObj] = useState('');
    const [startingDate, setStart] = useState('');
    const [endingDate, setEnd] = useState('');
    const [prio, setPrio] = useState('');
    const [category, setCat] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/newnote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ obj, startingDate, endingDate, prio, category, content })
        });

        const data = await res.json();

        if (data.success) {
            navigate('/notes');
        } else {
            setError(data.message);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="obj" className="form-label">contenuto della nota</label>
                        <input
                            type="text"
                            className="form-control"
                            id="obj"
                            name="obj"
                            value={obj}
                            onChange={(e) => setObj(e.target.value)}
                            placeholder="piero scopato nel culo"
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="startingDate" className="form-label">data d'inizio</label>
                        <input
                            type="date"
                            className="form-control"
                            id="startingDate"
                            name="startingDate"
                            value={startingDate}
                            onChange={(e) => setStart(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="endingDate" className="form-label">data di fine</label>
                        <input
                            type="date"
                            className="form-control"
                            id="endingDate"
                            name="endingDate"
                            value={endingDate}
                            onChange={(e) => setEnd(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="prio" className="form-label">inserire qui quanto è importante per te</label>
                        <input
                            type="number"
                            className="form-control"
                            id="prio"
                            name="prio"
                            value={prio}
                            onChange={(e) => setPrio(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">categoria associata</label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCat(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Contenuto (Markdown supportato)</label>
                        <textarea
                            className="form-control"
                            id="content"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Scrivi qui il contenuto in Markdown"
                            rows="6"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Anteprima del contenuto</label>
                        <div className="preview">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary center">Crea</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </>
    );
}

export default NotesForm;
