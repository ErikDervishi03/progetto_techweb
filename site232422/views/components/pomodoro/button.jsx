import React from 'react'

const Button = ({ type, buttonText = '', toggleVisibility }) => {
    if (type === 'settings') {
        return (
            <button className="pomodoro-app__preferences" name="settings" title="show preferences pane" onClick={toggleVisibility}>
                <i className="bi bi-gear h2"></i>
            </button>
        )
    }

    if (type === 'close') {
        return (
            <button className="pane__close-preferences" onClick={toggleVisibility}>
                {buttonText}
            </button>
        )
    }

    if (type === 'apply') {
        return (
            <div className="pane__apply-row">
                <input type="submit" value={buttonText} className="pane__apply-preferences" />
            </div>
        )
    }

    else {
        return (null)
    }
}

export default Button
