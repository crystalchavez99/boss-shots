import React, {useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import './SplashPage.css';
import logo from '../../assets/boss-shots.png';
import {BackgroundSlider} from 'react-background-slider';
import { getAllPhotosThunk } from '../../store/photos';

function SplashPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const photos = useSelector(state => Object.values(state.photos))

  let listurl = photos?.map(photo =>{
    return photo.photo_url
  })

  if (sessionUser) {
    history.push('/home')
  }
  useEffect(() => {
    dispatch(getAllPhotosThunk())
  }, [dispatch])
  return (

    <div id="splash-page">
      <div id="splash-main-div">
        <img src={logo} />
        {/* <img src='../../../assets/boss-shots.png' alt="boss-shots-logo" id="splash-logo" style={{width: "600px", height: "auto"}}/> */}
        <div id="splash-slogan">Beat the Boss,</div>
        <div id="splash-slogan-two">Share the Battle</div>
        <div id="splash-links-div">
          <NavLink to='/sign-up' className="splash-links" exact={true}>Start For Free</NavLink>
        </div>
      </div>
      {/* <BackgroundSlider
          images={listurl}
          duration={8}
          transition={2}
        /> */}
    </div>
  )
}

export default SplashPage;
