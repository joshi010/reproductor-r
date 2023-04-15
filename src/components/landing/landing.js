import React, { useEffect, useState } from "react";
import './landing.css';
import AlbumList from "../albumList/AlbumList";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Landing(){

    return(
        <div className="margins bottom-lel center">
            <Helmet>
                <title>Alabanzas Casa de Oración México</title>
            </Helmet>
            <h1 className="title-landing">Álbumes</h1>
            <div className="grid-default-album-landing">
                <AlbumList />
            </div>

            <div id="second">
                <h1 className="title-landing">Favoritos</h1>
                <div className="grid-default-album">
                    <Link className="link-react" title={'Me gusta'} to={`/albumes/favorites`}>
                        <div className="card-album">
                            <div className="image-container">
                                <img style={{scale:'0.5'}} src={'https://cdn-icons-png.flaticon.com/512/9576/9576640.png'} />
                            </div>
                            <div className="album-description">
                                <h2 style={{color:'#000'}}>Me gustan</h2>
                                <p></p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}