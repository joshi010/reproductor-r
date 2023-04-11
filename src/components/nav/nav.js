import React from "react";
import { NavLink } from "react-router-dom";
import './nav.css';

export default function Nav(){

    return(
        <nav>
            <ul>
                <NavLink to='/' className="navLink"><li>Albumes</li></NavLink>
                <NavLink className="navLink"><li>Playlist</li></NavLink>
                <NavLink className="navLink"><li>Favoritos</li></NavLink>
            </ul>
        </nav>
    )
}