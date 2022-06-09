import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {deleteCommentThunk} from '../../store/comments';
import './DeleteCommentForm.css';

function DeleteCommentForm({setShowModal,comment}){
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) =>{
    e.preventDefault()

    dispatch(deleteCommentThunk(comment))
  }
  return (
    <>
      <form id="delete-comment-form" onSubmit={onSubmit}>
        <p id='delete-comment-title' >Are you sure you want to delete?</p>
        <div id="dlt-comment-buttons">
          <div id="submit-btn-div">
            <button className="yes-delete-comment" id="submit-button"  onClick={async () => {
              dispatch(deleteCommentThunk(comment))
              setShowModal(false)
              // history.push('/home')
            }
              }>Yes</button>
          </div>
          <div id="cancel-dlt-comment">
            <button className="no-delete-comment" onClick={()=>setShowModal(false)}>No</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default DeleteCommentForm;
