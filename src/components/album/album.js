import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import './album.css';
import { CurrentSongContext } from "../../App";
import { Helmet } from "react-helmet";

export default function Album(props){
    const { updateCurrentSong, setPlay, play, currentSong } = useContext(CurrentSongContext);
    const params = useParams();
    const [ info, setInfo ] = useState();
    const [infoCopy, setInfoCopy ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const module = await import(`./albums-data/${params.album}/${params.album}`);
            setInfo(module.default);
        }
        
        fetchData();

    }, [params]);

    useEffect(() => {
        if (info) {
          const i = [...info];
          i.shift();
          setInfoCopy(i);
        }
      }, [info]);


      const handleClick =  (e) => async () => 
      {

          const audioFilePath = await import(`./albums-data/${params.album}/${e.audio}`);
          const audio = new Audio(audioFilePath.default);
          const context = new AudioContext({
            latencyHint: "interactive",
            sampleRate: 44100,
          });
          const source = context.createMediaElementSource(audio);
          source.connect(context.destination);

          audio.addEventListener('ended', () => {
              setInfoCopy((infoCopy) => {
                const currentIndex = infoCopy.findIndex((song) => song.audio === e.audio);
                const nextIndex = currentIndex === infoCopy.length - 1 ? 0 : currentIndex + 1;
                const nextSong = infoCopy[nextIndex];
                console.log(nextSong);
                handleClick(nextSong)();
                return infoCopy;
              });
            });
            
            if(play){
              play.pause();
              play.currentTime = 0;
            }

            updateCurrentSong(e);
            setPlay(audio);
            audio.play();
      };

    return(
        <div className="margins bottom-lel">
            <Helmet>
                <title>
                    {currentSong ? currentSong.title + ' • Alabanza' : info ? info[0].title + ' • Albúm' : 'Álbumes de Alabanza Casa de Oración México'}
                </title>
            </Helmet>
            <div id="heading">
                <div className="image-album-playlist-container">
                    <img src={info ? info[0].image ? info[0].image : './images/default-image.png' : 'Cargando...'}/>
                </div>
                <div id="lel">
                    <div>
                        <h1>{info ? info[0].title : 'Cargando...'}</h1>
                        <p>Albúm • {info ? info[0].det : 'Cargando...'}</p>
                    </div>

                </div>
            </div>
            <div id="container">
                {   
                    infoCopy ? 
                    infoCopy.map((lel, i) => {
                        return(
                            <div className="music-card" key={i} onClick={handleClick(lel)}>
                                <div>
                                    <h2>{i + 1}</h2>
                                </div>
                                <div>
                                    <h2>{lel.title}</h2>
                                    <p>Casa de Oración</p>
                                </div>
                            </div>
                        )
                    }) : 'loading'
                }
            </div>
        
        </div>
    )
}