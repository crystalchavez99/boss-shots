import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import DeleteAlbumForm from "./DeleteAlbumForm"


export default function DeleteAlbumModal({ id, album }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button  id="album-delete" className="btn-rnb" onClick={() => setShowModal(true)} >Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteAlbumForm setShowModal={setShowModal} album={album} id={id} />
                </Modal>
            )
            }
        </>
    )

}
