import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { updateCommentThunk } from '../../store/comments';
import './EditCommentForm.css';

export default function EditCommentForm({ comments, setShowModal }) {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()
  const [comment, setComment] = useState(comments.comment)
  const history = useHistory()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateCommentThunk(comment, comments?.id))
      .then((res) => {
        if (!res?.ok) {
          setErrors(res?.errors)
        } else {
          setErrors([])
          setShowModal(false)
        }
      })
  }
  return (
    <form id="edit-comment-form" onSubmit={onSubmit}>
      <div id="edit-comment-comment">Edit Comment</div>
      {errors?.length > 0 && errors?.map((error, ind) => (
        <div key={ind}>{error}</div>
      ))}
      <label> Comment: </label>
      <input id="edit-comment-comment-input" type="text" onChange={e => setComment(e.target.value)} value={comment} ></input>
      <button className="edit-comment-submit">Submit</button>
    </form>

  )

}
