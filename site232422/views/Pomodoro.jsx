import '../public/style/Pomodoro.css';
import Header from './components/pomodoro/header.jsx';
import Controls from './components/pomodoro/controls.jsx';
import TimerDisplay from './components/pomodoro/timerdisplay.jsx';
import Settings from './components/pomodoro/settings.jsx';
import Navbar from './components/Navbar.jsx';
import Commands from './components/pomodoro/commands.jsx'; // Import the Commands component

import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import timesUpSfx from '../public/sounds/timesUp.mp3';

function Pomodoro() {
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [timerMode, setTimerMode] = useState('pomo');
    const [pomoMode, setPomoMode] = useState('study');
    const [cicles, setCicles] = useState(0);
    const [pomoStudyTime, setpomoStudyTime] = useState(0.1);
    const [pomoBreakTime, setPomoBreakTime] = useState(5);
    const [shortLength, setShortLength] = useState(3);
    const [longLength, setLongLength] = useState(15);
    const [fontPref, setFontPref] = useState('kumbh');
    const [accentColor, setAccentColor] = useState('default');
    const [secondsLeft, setSecondsLeft] = useState(pomoStudyTime * 60);
    const [isActive, setIsActive] = useState(false);
    const [buttonText, setButtonText] = useState('START');
    const [volume, setVolume] = useState(1);
    const [timesUp] = useSound(timesUpSfx, { volume: volume });

    useEffect(() => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setSecondsLeft((secondsLeft) => secondsLeft - 1);
            }, 1000);

            if (secondsLeft === 0) {
                clearInterval(interval);
                setIsActive(false);
                setButtonText('');
                notify(pomoMode);
            }

            return () => clearInterval(interval);
        }
    }, [isActive, secondsLeft, timesUp]);

    const notify = (title, message) => {
        if (Notification.permission === "granted") {
            new Notification(title, { body: message });
        }
    };

    const handleTimerChange = (newMode) => {
        setTimerMode(newMode);
        setSecondsLeft(getLengthByMode(newMode) * 60);
    };

    const getLengthByMode = (mode) => {
        if (mode === 'pomo') {
            return pomoMode === 'study' ? pomoStudyTime : pomoBreakTime;
        } 
        if (mode === 'short') return shortLength;
        if (mode === 'long') return longLength;
        return pomoStudyTime;
    };

    const toggleSettingsVisibility = () => {
        setSettingsVisible(!settingsVisible);
    };

    const formatTimeLeft = (seconds) => {
        return (`${Math.floor(seconds / 60)}:${seconds % 60 > 9 ? seconds % 60 : '0' + seconds % 60}`);
    };

    const calcPercentage = () => {
        return ((secondsLeft / (getLengthByMode(timerMode) * 60)) * 100);
    };

    const handleRepeat = () => {
        setPomoMode('study');
        setSecondsLeft(pomoStudyTime * 60);
    };

    const handlePlayPause = () => {
        setIsActive(!isActive);
        setButtonText(isActive ? 'START' : 'PAUSE');
    };

    const handleNextCycle = () => {
        if (timerMode === 'pomo') {
            setCicles(cicles + 1);
            setPomoMode('study');
        }
        setSecondsLeft(getLengthByMode(timerMode) * 60);
    };

    return (
        <>
            <Navbar />
            <div className="pomodoro-app">
                <TimerDisplay
                    timerMode={timerMode}
                    percentage={calcPercentage()}
                    timeLeft={formatTimeLeft(secondsLeft)}
                    setSecondsLeft={setSecondsLeft}  
                    pomoStudyTime={pomoStudyTime}
                    pomoBreakTime={pomoBreakTime}
                    pomoMode={pomoMode}
                    setPomoMode={setPomoMode}
                    cicles={cicles}
                    setCicles={setCicles}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    buttonText={buttonText}
                    setButtonText={setButtonText}
                    volume={volume}
                    setVolume={setVolume}
                />

                <Commands
                    onRepeat={handleRepeat}
                    onPlayPause={handlePlayPause}
                    onNextCycle={handleNextCycle}
                    isActive={isActive}
                    toggleSettingsVisibility={toggleSettingsVisibility} // Pass visibility toggle
                    cicles={cicles}
                />
                <Settings 
                    visible={settingsVisible}
                    toggleSettingsVisibility={toggleSettingsVisibility}
                    pomoStudyTime={pomoStudyTime}
                    pomoBreakTime={pomoBreakTime}
                    pomoMode={pomoMode}
                    setpomoStudyTime={setpomoStudyTime}
                    setPomoBreakTime={setPomoBreakTime}
                    shortLength={shortLength}
                    setShortLength={setShortLength}
                    longLength={longLength}
                    setLongLength={setLongLength}
                    fontPref={fontPref}
                    setFontPref={setFontPref}
                    accentColor={accentColor}
                    setAccentColor={setAccentColor}
                    closeSettings={toggleSettingsVisibility}
                    setSecondsLeft={setSecondsLeft}
                    timerMode={timerMode}
                />
            </div>
        </>
    );
}

export default Pomodoro;
