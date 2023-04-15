import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import './album.css';
import { CurrentSongContext } from "../../App";
import { Helmet } from "react-helmet";

export default function Album(){
    const { updateCurrentSong, setPlay, play, currentSong } = useContext(CurrentSongContext);
    const params = useParams();
    const [ info, setInfo ] = useState();
    const [infoCopy, setInfoCopy ] = useState(null);

    useEffect(() => {
        if(params.album == 'favorites') {
            const store = localStorage.getItem('favorites');
            setInfo(JSON.parse(store));
        } else {
            const fetchData = async () => {
                const module = await import(`./albums-data/${params.album}/${params.album}`);
                setInfo(module.default);
            }

            fetchData();
        }
      
        

    }, [params]);

    useEffect(() => {
        if (info) {
          const i = [...info];
          i.shift();
          setInfoCopy(i);
        }
      }, [info]);

      const builder = 'https://raw.githubusercontent.com/joshi010/betterstepsvideos/main/audios/';
      const handleClick =  (e) => async () => 
      {
        const response = await fetch(builder + e.audio + '.m4a');
        const data = await response.arrayBuffer();
        const blob = new Blob([data], { type: response.headers.get('Content-Type') });
        const audio = new Audio(URL.createObjectURL(blob));
      
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
      const [fav, setFav] = useState(JSON.parse(localStorage.getItem('favorites')));

      const handleFaveRemove = (lel) => {
        return () => {
            if(fav.some(x => x.title === lel.title)) {
                handleRemove(lel.title);
            } else {
                handleFavorite(lel);
            }
        }
      }

      const handleFavorite = (e) => {
        setFav(prev => {
            const newState = [...prev, { title: e.title, audio: e.audio }];
            localStorage.setItem('favorites', JSON.stringify(newState));
            return newState;
          });
      }

      const handleRemove = (title) => {
        setFav(prev => {
          const newState = prev.filter(x => x.title !== title);
          localStorage.setItem('favorites', JSON.stringify(newState));
          return newState;
        });
      }

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
                            <div className="music-card-1" key={i}>
                                <div className="music-card" onClick={handleClick(lel)}>
                                    <div>
                                        <h2>{i + 1}</h2>
                                    </div>
                                    <div>
                                        <h2>{lel.title}</h2>
                                        <p>Casa de Oración</p>
                                    </div>
                                </div>
                                <div className="icon" onClick={handleFaveRemove(lel)}>
                                    {
                                        fav.some((x) => x.title === lel.title) 
                                        ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffffcc" d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/></svg>
                                        : <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path fill="#ffffffcc" d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
                                    }
                                    
                                </div>
                            </div>
                        )
                    }) : 'loading'
                }
            </div>
        
        </div>
    )
}