import React from "react";
import './landing.css';
import AlbumList from "../albumList/AlbumList";
import Playlist from "../playList/Playlists";
import { Helmet } from "react-helmet";


export default function Landing(){


    return(
        <div className="margins center">
            <Helmet>
                <title>Alabanzas Casa de Oración México</title>
            </Helmet>
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