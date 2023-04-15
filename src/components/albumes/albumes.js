import React from "react";
import AlbumList from "../albumList/AlbumList";

export default function Abumes(){

    return(
        <div className="margins">
            <h1 className="title-landing">Álbumes</h1>

            <div className="grid-default-album">
                <AlbumList />
            </div>
        </div>
    )
}