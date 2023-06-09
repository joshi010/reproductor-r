import React from "react";
import {albumData} from "./albumsData";
import { Link } from "react-router-dom";

export default function AlbumList(){
    return (
        <>
        {   
            albumData.map((album, i) => {
                return(
                    <Link key={i} className="link-react" title={album.title} to={`albumes/${album.slug}`}>
                        <div className="card-album" key={i}>
                            <div className="image-container">
                                <img src={album.image ? album.image : './images/default-image.png'} />
                            </div>
                            <div className="album-description">
                                <h2 style={{color:'#000'}}>{album.title}</h2>
                                <p>{album.date}</p>
                            </div>
                        </div>
                    </Link>
                )
            })
        }

        </>
    )
}