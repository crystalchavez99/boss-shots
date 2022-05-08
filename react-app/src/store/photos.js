const GET_PHOTOS = 'photos/GET_PHOTOS'
const POST_PHOTO = 'photos/POST_PHOTO'
const GET_ONE_PHOTO = 'photos/GET_ONE_PHOTO'
const UPDATE_PHOTO = 'photos/UPDATE_PHOTO'
const DELETE_PHOTO = 'photos/DELETE_PHOTO'
const ADD_TAG = 'photos/ADD_TAG'
const REMOVE_TAG = 'photos/REMOVE_TAG'

const getAllPhotos = (photos) => ({
  type: GET_PHOTOS,
  payload: photos
})

const postPhoto = (photo) => ({
  type: POST_PHOTO,
  payload: photo
})

const getOnePhoto = (photo) => ({
  type: GET_ONE_PHOTO,
  payload: photo
})

const updatePhoto = (photo) => ({
  type: UPDATE_PHOTO,
  payload: photo
})

const deletePhoto = (photo) => ({
  type: DELETE_PHOTO,
  payload: photo
})

const addTag = (photo) => ({
  type: ADD_TAG,
  payload: photo
})

const removeTag = (tag) => ({
  type: REMOVE_TAG,
  payload: tag
})

export const getAllPhotosThunk = () => async (dispatch) => {

  const response = await fetch('/api/photos/all')

  if (response.ok) {
    const photos = await response.json();

    dispatch(getAllPhotos(photos.photos))
    return response;
  }
}

export const postPhotoThunk = (photo) => async (dispatch) => {
  const {title, image, description, user_id} = photo;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("user_id", user_id);

  if (image) formData.append("image", image);

  const response = await fetch('/api/photos/add_photo', {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const newPhoto = await response.json();
    dispatch(postPhoto(newPhoto));
    //return newPhoto;
  }else if (response.status < 500) {
    const data = await response.json();

    return data
    // if (data.errors) {
    //   return data.errors;
    // }
  }
  return response;
}

export const getOnePhotoThunk = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`)

  if (response.ok) {
    const photo = await response.json();
    dispatch(getOnePhoto(photo.photo));
    return photo;
  }
  return response;
}


export const updatePhotoThunk = (photo) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photo.id}/edit`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photo)
  })
  if (response.ok) {
    const updatedPhoto = await response.json();
    dispatch(updatePhoto(updatedPhoto));
  }else if (response.status < 500) {
    const data = await response.json();

    return data
  }
  return response;
}

export const deletePhotoThunk = (photo) => async (dispatch) => {

  const response = await fetch(`/api/photos/${photo.id}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    const deletedPhoto = await response.json();
    dispatch(deletePhoto(deletedPhoto));
    return deletedPhoto;
  }
  return response;
}

export const addTagToPhoto = (photo_id, tag_id) => async (dispatch) => {

  const response = await fetch(`/api/photos/${photo_id}/add_tag`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({tag_id})
  })
  if (response.ok) {
    const addedTag = await response.json();
    dispatch(addTag(addedTag))
  }
}

export const removeTagFromPhoto = (photo_id, tag_id) => async (dispatch) => {

  const response = await fetch(`/api/photos/${photo_id}/remove_tag`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({tag_id})
  })

  if (response.ok) {
    const deletedPhoto = await response.json();
    dispatch(removeTag(deletedPhoto));
    return deletedPhoto;
  }
  return response;
}



const initialState = {};

const photosReducer =  (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PHOTOS:
      newState = { ...state }

      action.payload.forEach(photo => newState[photo.id] = photo);
      return {...newState,...state};
    case POST_PHOTO:
      newState = { [action.payload.id]: action.payload, ...state };
      return newState;
    case GET_ONE_PHOTO:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_PHOTO:
      newState = { ...state };
      newState = { [action.payload.id]: action.payload};
      return newState;
    case DELETE_PHOTO:
      newState = { ...state };
      
      delete newState[action.payload.id];

      return newState;
    case ADD_TAG:
      newState = {...state}
      newState[action.payload.id] = action.payload
      return newState;
      case REMOVE_TAG:
        newState = {...state}
        newState[action.payload.id] = action.payload
        return newState;
    default:
      return state;
  }
}

export default photosReducer;
