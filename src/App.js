import React, { Suspense, useEffect, lazy, createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, useRoutes, useLocation, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/nav/nav';
import Reproductor from './components/album/reproductor';
const Landing = lazy(() => import('./components/landing/landing'));
const Album = lazy(() => import('./components/album/album'));
const Albumes = lazy(() => import('./components/albumes/albumes'));
const routes = [
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/albumes/:album',
    element: <Album />
  },
  {
    path: '/albumes',
    element: <Albumes />
  }
];

const CurrentSongContext = createContext({});
export { CurrentSongContext };  

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scroll(0,0);

  }, [location]);

  const element = useRoutes(routes);
  return element;
}



function AppWithRouter(){
  const [favorites, setFavorites ] = useState([{title: 'Canciones que te gustan', image: 'https://cdn-icons-png.flaticon.com/512/9576/9576640.png'}])
  const [i, setI] = useState(0);

  useEffect(() => {
      if(i === 0){
          const store = localStorage.getItem('favorites');
          if(store){
              setFavorites(JSON.parse(store));
          } else {
              localStorage.setItem('favorites', JSON.stringify([...favorites]));
          }
      }
      setI(prev => prev + 1)
  }, [favorites]);
  
  const [currentSong, setCurrentSong] = useState(null);
  const [ play, setPlay ] = useState(null);
  const updateCurrentSong = (song) => {
    setCurrentSong(song);
  }

  return(
    <CurrentSongContext.Provider value={{ currentSong, updateCurrentSong, play, setPlay}}>
      <Router>
        <Suspense>
          <App />
        </Suspense>
        <Nav />
        <Reproductor />
      </Router>
    </CurrentSongContext.Provider>
  )
}

export default AppWithRouter;
