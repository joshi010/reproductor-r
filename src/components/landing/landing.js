import React from "react";
import './landing.css';
import AlbumList from "../albumList/AlbumList";
import Playlist from "../playList/Playlists";


export default function Landing(){


    return(
        <div className="margins center">
            <div className="grid-default-album">
                <AlbumList />
            </div>
            <div id="second">
                <h2>Playlists</h2>
                <div>
                    <Playlist />
                </div>
            </div>
        </div>
    )
}