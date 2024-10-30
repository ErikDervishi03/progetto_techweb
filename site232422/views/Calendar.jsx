import React, { useState } from 'react';
import {Link, Outlet} from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import {getMonthYearName, generateCalendar} from '../public/scripts/dateutils.js'
import '../public/style/Calendar.css'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [displayedDate, setDisplayedDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))

    function handlePrevMonth() {
        const prevMonth = new Date(displayedDate.getFullYear(), displayedDate.getMonth()-1)
        setDisplayedDate(prevMonth)
    }

    function handleNextMonth() {
        const nextMonth = new Date(displayedDate.getFullYear(), displayedDate.getMonth()+1)
        setDisplayedDate(nextMonth)
    }

    return(
        <div className="bglight min-vh-100">
            <Navbar></Navbar>
            <div className="container text-center mt-4 wrap">

                <div className="calendar-container bg-white p-3 shadow rounded-4">

                    <div className="d-flex justify-content-between">
                        <h2 className="text-start text-nowrap">{getMonthYearName(displayedDate)}</h2>

                        <div className="btn-group" role="group">
                            <button className="btn btn-primary" onClick={handlePrevMonth}>
                                <i className="bi bi-chevron-double-left"></i>
                            </button>
                            <button className="btn btn-primary" onClick={handleNextMonth}>
                                <i className="bi bi-chevron-double-right"></i>
                            </button>
                        </div>
                    </div>

                    <table className="table calendar-table pb-3">
                        <thead>
                            <tr className="text-center">
                                <th>Dom</th>
                                <th>Lun</th>
                                <th>Mar</th>
                                <th>Mer</th>
                                <th>Gio</th>
                                <th>Ven</th>
                                <th>Sab</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generateCalendar(displayedDate)}
                        </tbody>
                    </table>
                </div>

                <div className="event-box bg-white shadow rounded-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Calendar
