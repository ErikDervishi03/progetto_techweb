import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function Commands({ 
    onRepeat,
    onPlayPause,
    onNextCycle,
    isActive, 
    toggleSettingsVisibility,  // Make sure this prop is passed
    cicles
}) {
    return (
        <div className="commands d-flex align-items-center justify-content-center">
            <span>cicle: {cicles}</span>
            <ButtonGroup>
                {/* Repeat button */}
                <Button 
                    title="repeat cycle"
                    variant="link" 
                    onClick={onRepeat} 
                    className="commands__button" 
                    disabled={isActive}>
                    <i className="bi bi-arrow-clockwise" style={{ fontSize: '20px' }}></i>
                </Button>
                
                {/* Play/Pause button */}
                <Button 
                    variant="link" 
                    onClick={onPlayPause} 
                    className="commands__button">
                    {isActive ? (
                        <i className="bi bi-pause" title="pause" style={{ fontSize: '35px' }}></i> 
                    ) : (
                        <i className="bi bi-play-circle" title="start" style={{ fontSize: '35px' }}></i> 
                    )}
                </Button>
                
                {/* Next Cycle button */}
                <Button 
                    title="next cycle"
                    variant="link" 
                    onClick={onNextCycle} 
                    className="commands__button" 
                    disabled={isActive}>
                    <i className="bi bi-arrow-right-circle" style={{ fontSize: '20px' }}></i>
                </Button>

                {/* Settings button */}
                <Button 
                    title="setting"
                    variant="link" 
                    onClick={toggleSettingsVisibility}  // Use onClick to toggle settings visibility
                    className="commands__button">
                    <i className="bi bi-gear" style={{ fontSize: '20px' }}></i>
                </Button>
            </ButtonGroup>
            
        </div>
    );
}

export default Commands;
