import React, { Suspense, useEffect, lazy, createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, useRoutes, useLocation, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/nav/nav';
import Reproductor from './components/album/reproductor';
const Landing = lazy(() => import('./components/landing/landing'));
const Album = lazy(() => import('./components/album/album'));
const routes = [
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/:album',
    element: <Album />
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
  const [currentSong, setCurrentSong] = useState(null);
  const [ play, setPlay ] = useState(null);
  const updateCurrentSong = (song) => {
    setCurrentSong(song);
  }

  return(
    <CurrentSongContext.Provider value={{ currentSong, updateCurrentSong, play, setPlay}}>
      <Router>
        <Nav />
        <Suspense>
          <App />
        </Suspense>
        <Reproductor />
      </Router>
    </CurrentSongContext.Provider>
  )
}

export default AppWithRouter;
