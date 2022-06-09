import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import EditCommentForm from "./EditCommentForm"

export default function EditCommentModal({ comments }) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button className="update-comment" onClick={() => setShowModal(true)}>Update Comment</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm setShowModal={setShowModal} comments={comments}></EditCommentForm>
                </Modal>
            )
            }
        </>
    )


}
