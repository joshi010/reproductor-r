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

    // const handleNext = () => {
    //     const currentIndex = infoCopy.findIndex((song) => song.audio === play.audio);
    //     const nextIndex = currentIndex === infoCopy.length - 1 ? 0 : currentIndex + 1;
    //     const nextSong = infoCopy[nextIndex];
    //     handlePlay(nextSong);
    // };
      
    return(
        <div id="reproductor-cont">
            <div className="margins flex">
                {
                    currentSong && (
                        <>
                        <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                            <h3 id="song-title-repr">{currentSong.title}</h3>
                            <p>Casa de Oración</p>
                        </div>
                        <div id="controllers-container">
                            <div className="controls">
                            {'<<'}
                            </div>
                            <div className="bar-container" onClick={togglePause}>
                                <div className="bar">

                                </div>
                                <div className="bar">

                                </div>
                            </div>
                                
                            <div className="controls">
                            {'>>'}
                            </div>
                        </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}