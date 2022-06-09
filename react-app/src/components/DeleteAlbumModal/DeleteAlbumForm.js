import React from 'react';
import { deleteSingleAlbum, getAllAlbums } from "../../store/albums"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './DeleteAlbumForm.css';


export default function DeleteAlbumForm({ id, setShowModal, album }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(deleteSingleAlbum(id)).then(() => {

            history.push('/home');
            setShowModal(false)
        })





    }

    return (
        <>
            <form id="delete-album-form" onSubmit={onSubmit} action="/home">
                <div id="delete-album-title">Are you sure you want to delete this album?</div>
                <div className="album-delete-btns"> <button className="btn-rnb"  id="album-delete-yes">Yes</button>
                    <button className="btn-no" id="album-delete-no" onClick={()=>setShowModal(false)}> No </button>
                </div>
            </form>
        </>
    )

}
