import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as albumActions from '../store/albums';
import { useHistory, useParams } from 'react-router-dom'

export default function Test() {
  // const [albums, setAlbums] = useState([])
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let { albumId } = useParams()
  useEffect(() => {
    dispatch(albumActions.getSingleAlbum(albumId))
  }, [dispatch])

  const result = Object.values(state?.albums)
  const album = result[0]
  // console.log(album?.photos?.photos, '----state----');
  const photosInAlbum = album?.photos?.photos
  console.log("all photos", photosInAlbum)
  // ADD ALBUM:
  // const [title, setTitle] = useState('')
  // const history = useHistory()
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const user_id = state.session?.user.id
  //   console.log(user_id, '---user----------');
  //   console.log(title, 'title-------------');
  //   dispatch(albumActions.addSingleAlbum(title, user_id))
  //   history.push('/allAlbums')
  // }

  return (
    <div>
      <h1>{album?.title}</h1>
      {photosInAlbum?.map(photo => (
        <div key={photo.id}>
          <p>{photo.title}</p>
          <img src={photo.photo_url} alt={photo.title} style={{ width: '250px' }} />
          <p>{photo.description}</p>

        </div>
      ))}
    </div>
  )
}

{/* <form onSubmit={onSubmit}>
<label>Album Title</label>
<input type="text" onChange={ e => setTitle(e.target.value)} value={title}></input>
<button>Submit</button>
</form> */}
