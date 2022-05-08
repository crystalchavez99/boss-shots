import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPhotoThunk } from "../../store/photos.js"

function AddPhotoForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const user_id = useSelector(state => state.session.user.id);
  let data;



  // useEffect(()=>{
  //   if(!image){
  //     errors.push("photo_url : This field is required.")
  //   }
  // })
  const photoSubmit = async (e) => {
    e.preventDefault();
    //   if(errors.length) {
    //     setErrors(true);
    //     return;
    // }
    let newPhoto = {
      user_id,
      title,
      image,
      description
    }

    await dispatch(postPhotoThunk(newPhoto))
    .then((res)=>{

      if(!res?.ok){
        setErrors(res?.errors)
      }else{
        setErrors([])
        setShowModal(false)
      }
    })
  

  }
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }
  return (
    <>
      <form id="add-photo-form" onSubmit={photoSubmit}>
        <div>
          {errors?.length > 0 && errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div id="add-photo-title">Add Photo</div>
        <label id="title-input-label">
          Title:
        </label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}

        />
        <label id="photo-url-label">
          Photo URL:
        </label>
        <input
          id="url-input"
          type="file"
          onChange={updateImage}
        />
        <label id="description-label">
          Description:
        </label>
        <textarea
          id="description-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div id="submit-btn-div">
          <button className="btn-rnb" id="submit-button" type="submit">Add Photo</button>
        </div>
      </form>
    </>
  )
}

export default AddPhotoForm;
