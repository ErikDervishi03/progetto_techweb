import React, {useState} from 'react'
import '../../../public/style/AddEventPopup.css'
import form from '../../../public/scripts/AddEventForm.js'

function AddEventsPopup({ trigger, setTrigger, date, onEventAdded }) {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState(0)
    const [isRepeatable, setIsRepeatable] = useState(false)
    const [frequency, setFrequency] = useState('')
    const [until, setUntil] = useState(null)
    const [fAlert, setFAlert] = useState("no")
    const [sAlert, setSAlert] = useState("no")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(isRepeatable === false) {
            setFrequency(null)
            setUntil(null)
        }

        if(fAlert === "null") {
            setSAlert(null)
        }
        
        const res = await fetch('/api/add-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({date, title, time, duration, isRepeatable, frequency, until, fAlert, sAlert})
        })

        const data = await res.json()

        if (data.success) {
            console.log("ok")
        }
        else {
            console.log("no")
        }

        onEventAdded()
    }

    return trigger ? (
        <>
        <div className="transparent"></div>

        <div className="modal d-block" tabIndex="-1" aria-labelledby="staticBackdropLabel" role="dialog">
            <div className="modal-dialog modal-xl modal-fullscreen-md-down modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Aggiungi Nuovo Evento</h1>
                        <button type="button" className="btn-close" onClick={() => setTrigger(false)} aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="mb-3 text-start">
                                {form.getTitleForm(title, setTitle)}
                            </div>

                            <div className="mb-3 row text-start">
                                {form.getTimeForm(time, setTime)}
                            </div>

                            <div className="mb-3 row text-start">
                                {form.getDurationForm(duration, setDuration)}
                            </div>

                            <div className="mb-3 row text-start">
                                <div className="col">
                                    {form.getIsRepeatableForm(isRepeatable, setIsRepeatable)}
                                </div>
                                {isRepeatable && form.getFrequencyForm(frequency, setFrequency, until, setUntil) }
                            </div>

                            <div className="mb-3 row text-start">
                                {form.getAlertForm(fAlert, setFAlert, "fAlert", "1")}
                            </div>
                            {fAlert!="null" && (
                                <div className="mb-3 row text-start">
                                    {form.getAlertForm(sAlert, setSAlert, "sAlert", "2")}
                                </div>
                            )}
                        </form>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setTrigger(false)}>
                            Chiudi
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Aggiungi</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    ) : null
}

export default AddEventsPopup