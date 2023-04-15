import React, { useEffect, useState } from "react";

export default function Playlist(){
    const [favorites, setFavorites ] = useState([{title: 'Canciones que te gustan', image: 'https://cdn-icons-png.flaticon.com/512/1077/1077086.png'}])
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
    return(
        <div>
            <h2>Favoritos</h2>

        </div>
        
    )
}