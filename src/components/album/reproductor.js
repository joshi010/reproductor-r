import React, { useContext, useState } from "react";
import { CurrentSongContext } from '../../App';
import './album.css';

export default function Reproductor(){
    const { currentSong, play } = useContext(CurrentSongContext);
    const [ istrue, setIsTrue ] = useState(false);

    const togglePause = () => {
        setIsTrue(prev => !prev);
        if(istrue){
            play.play();
        } else {
            play.pause();
        }
    }

      
    return(
        <>
        {
            currentSong && (
                <div id="reproductor-cont">
                    <div className="margins flex">
                        {
                            currentSong && (
                                <>
                                <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                                    <h3 id="song-title-repr">{currentSong.title}</h3>
                                    <p>{currentSong.album}</p>
                                </div>
                                <div id="controllers-container">
                                    <div className="bar-container" onClick={togglePause}>
                                        {
                                            istrue ? (
                                                <>
                                                    <div className="triangle-container">
                                                        <div className="triangle">
        
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                    <>
                                                        <div className="bar">
        
                                                        </div>
                                                        <div className="bar">
        
                                                        </div>
                                                    </>
                                                )
                                        }
                                    </div>
                                </div>
                                </>
                            )
                        }
                    </div>
                </div>
    
            )

        }
        </>
    )
}