import React from 'react';
import MuteToggle from './mutetoggle.jsx';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useSound from 'use-sound';
import startSfx from '../../../public/sounds/startTimer.mp3';
import pauseSfx from '../../../public/sounds/pauseTimer.mp3';

const TimerDisplay = ({
    timerMode,
    percentage,
    timeLeft,
    setSecondsLeft,
    pomoStudyTime,
    pomoBreakTime,
    pomoMode,
    setPomoMode,
    cicles,
    setCicles,
    isActive,
    setIsActive,
    buttonText,
    setButtonText,
    volume,
    setVolume,
}) => {
    const [play] = useSound(startSfx, {
        interrupt: true,
        volume: volume,
    });
    const [pause] = useSound(pauseSfx, {
        interrupt: true,
        volume: volume,
    });

    const handleClick = (event) => {
        if (event.target.id === 'muteButton') {
            return null;
        }

        if (timeLeft === '0:00') {
            if (timerMode === 'pomo') {
                setIsActive(false);
                setButtonText('START');
                if (pomoMode === 'study') {
                    setSecondsLeft(pomoBreakTime * 60);
                    setPomoMode('break');
                } else {
                    setSecondsLeft(pomoStudyTime * 60);
                    setPomoMode('study');
                    setCicles(cicles + 1);
                }
            }
            return null;
        }

        if (isActive) {
            pause();
        } else {
            play();
        }
        setIsActive(!isActive);
        setButtonText(
            buttonText === 'START' || buttonText === 'RESUME' ? 'PAUSE' : 'RESUME'
        );
    };

    let timesUpMsg =
        timerMode === 'pomo' ? 'Time for a break' : 'Back to work!';
    let timeText = timeLeft === '0:00' ? timesUpMsg : timeLeft;
    let textSize = timeLeft === '0:00' ? '12px' : '28px';

    return (
        <div className="timer" onClick={handleClick}>
            <div className="timer__display">
                {/* Timer Display */}
                <CircularProgressbarWithChildren
                    value={percentage}
                    text={timeText}
                    strokeWidth={4}
                    styles={buildStyles({
                        pathTransitionDuration: 0.5,
                        pathColor: 'var(--accent-color)',
                        textColor: 'white',
                        textSize: textSize,
                        fontFamily: 'var(--font-current)',
                        trailColor: 'none',
                    })}
                >
                    <MuteToggle volume={volume} setVolume={setVolume} />
                    <span className="display__start-pause">
                        {pomoMode.toUpperCase()}
                    </span>
                </CircularProgressbarWithChildren>
            </div>
        </div>
    );
};

export default TimerDisplay;
