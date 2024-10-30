import React from "react"

export function getTitleForm(title, setTitle) {
    return(
        <>
            <label htmlFor="title" className="form-label">Titolo</label>
            <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Inserisci il titolo"
                required
            />
        </>
    )
}

export function getTimeForm(time, setTime) {
    return(
        <>
            <label htmlFor="time" className="form-label col">Orario</label>
            <input
                type="time"
                className="form-control col"
                id="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
        </>
    )
}

export function getDurationForm(duration, setDuration) {
    return(
        <>
            <label htmlFor="duration" className="form-label col">Durata</label>
            <input
                type="number"
                className="form-control col"
                id="duration"
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Inserisci la durata in minuti"
                required
            />
        </>
    )
}

export function getIsRepeatableForm(isRepeatable, setIsRepeatable) {
    return(
        <>
            <label className="form-check-label" htmlFor="isRepeatable">Ripetibile</label>
            <input
                type="checkbox"
                className="form-check-input"
                id="isRepeatable"
                name="isRepeatable"
                checked={isRepeatable}
                onChange={(e) => setIsRepeatable(e.target.checked)}
            />
        </>
    )
}

export function getFrequencyForm(frequency, setFrequency, until, setUntil) {
    return(
        <>
            <div className="col">
                <label htmlFor="frequency" className="form-label">Frequenza</label>
                <select
                    className="form-select"
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                >
                    <option value="" disabled hidden>Seleziona la frequenza</option>
                    <option value="giornaliero">Giornaliero</option>
                    <option value="settimanale">Settimanale</option>
                    <option value="mensile">Mensile</option>
                    <option value="annuale">Annuale</option>
                </select>
            </div>
            <div className="col">
                <label htmlFor="until" className="form-label">Fino a</label>
                <input
                    type="date"
                    className="form-control"
                    id="until"
                    name="until"
                    value={until}
                    onChange={(e) => setUntil(e.target.value)}
                    required
                />
            </div>
        </>
    )
}

export function getAlertForm(alert, setAlert, nAlert, n) {
    return(
        <>
            <label htmlFor={`${nAlert}`} className="form-label col">Avviso ({`${n}`})</label>
            <select
                className="form-select col"
                id={`${nAlert}`}
                value={alert}
                onChange={(e) => setAlert(e.target.value)}
            >
                <option value="no">Nessuno</option>
                <option value="timeOfEvent">Al momento dell'evento</option>
                <option value="5m">5 minuti prima</option>
                <option value="10m">10 minuti prima</option>
                <option value="15m">15 minuti prima</option>
                <option value="30m">30 minuti prima</option>
                <option value="1h">1 ora prima</option>
                <option value="2h">2 ore prima</option>
                <option value="1d">1 giorno prima</option>
                <option value="2d">2 giorni prima</option>
                <option value="1w">1 settimana prima</option>
            </select>
        </>
    )
}

const form = {
    getTitleForm,
    getTimeForm,
    getDurationForm,
    getIsRepeatableForm,
    getFrequencyForm,
    getAlertForm
}

export default form