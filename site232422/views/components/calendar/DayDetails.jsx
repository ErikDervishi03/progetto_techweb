import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import {getStringDate} from '../../../public/scripts/dateutils.js'
import AddEventsPopup from './AddEventsPopup.jsx'

function DayDetails() {
    const { dayId } = useParams()
    const date = new Date(dayId)
    const [popup, setPopup] = useState(false)
    const [events, setEvents] = useState([])
    const [error, setError] = useState(null)

    const listEvents = async (e) => {
        setError(null)
        setEvents([])
        try{
            const dateS = date.toISOString()
            const res = await fetch(`/api/get-all-events?date=${encodeURIComponent(dateS)}`)
            const data = await res.json()
            if (data.success) {
                setEvents(data.events)
            }
            else {
                //setError("Errore nel caricamento degli eventi.")
            }
        }
        catch(err) {
            setError("Si è verificato un errore.")
        }
    }

    useEffect(() => {
        listEvents()
    }, [dayId])

    const handleEventAdded = () => {
        listEvents()
    }

    return (
        <>
            <h2 className="mt-3">{getStringDate(date)}</h2>
            <hr className="hr" />

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="event-list mb-3 mx-2">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div key={index} className="card mb-1">
                            <div className="card-body" style={{ padding: '4px', margin: '0px' }}>
                                <h5 className="card-title text-start">{event.title}</h5>
                                <p className="text-muted text-start">
                                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {"\t"}-{"\t"}
                                    {event.duration}m
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">Nessun evento trovato per questa data.</p>
                )}
            </div>

            <button type="button" className="btn btn-primary mb-3" onClick={() => setPopup(true)}>
                Aggiungi Nuovo Evento
            </button>
            <AddEventsPopup trigger={popup} setTrigger={setPopup} date={date} onEventAdded={handleEventAdded}/>
        </>
    );
    
}

export default DayDetails