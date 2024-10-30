import React from 'react'
import { Link } from 'react-router-dom'

const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

export function getMonthYearName(date) {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

export function getStringDate(date) {
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

export function generateCalendar(date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDayWeek = new Date(year, month, 1).getDay()
    const numDays = getDaysInMonth(year, month)

    let days = []
    let day = 1;

    //spazi vuoti nella prima settimana se necessari
    for (let i = 0; i < firstDayWeek; i++) {
        days.push(<td key={`empty-${i}`}></td>)
    }

    //giorni del mese
    for (let i = 0; i < numDays; i++) {
        let dateString = "" + year + "-" + (month+1) + "-" + day
        days.push(
            <td key={i} className="text-center">
                <Link to={`/calendar/${dateString}`} key={`${dateString}`}> {day} </Link>
            </td>
        )
        day++
    }

    let weeks = []
    //nuova riga ogni 7 giorni
    for(let i=0; i<days.length; i+=7) {
        weeks.push(
            <tr key={`week-${i}`}>
                {days.slice(i, i + 7)}
            </tr>
        )
    }

    return weeks
}
