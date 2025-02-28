import React, { useEffect } from 'react';
import { getAllAlbums } from "../../store/albums"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import AddAlbumModal from '../AddAlbumModal.js/index.js';

import "./DisplayAlbums.css"


export default function DisplayAlbums({ albums }) {
    const dispatch = useDispatch();
    const albums1 = useSelector(state => Object.values(state?.albums))
    const userId = useSelector(state => state.session?.user?.id)
    const myAlbums = albums1.filter(album => album.user_id === userId);


    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])


    return (

        <div className="album-display-div">
            <div className="album-my-album-div">
                <h3 className="album-title">My Albums</h3>
            </div>
            <ul className="albumClass">
                {myAlbums?.map(album => (
                    <>
                        <NavLink key={album.id} to={`/albums/${album.id}`} exact={true} className='nav-link-album'>
                            <li className="albumLi"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    listStyle: "none", width: "150px", height: "150px", background: `url(${album?.photos?.photos[0]?.photo_url})`, backgroundRepeat: "no-repeat",
                                    backgroundSize: "150px 150px", borderRadius: "4px", margin: "3px",
                                }}><p>{album.title}</p>
                            </li>
                        </NavLink>
                    </>
                ))}
            </ul>
        </div>
    )
}
