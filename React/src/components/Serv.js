import { Button } from '@mui/material'
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './Ser.css'
import { useHistory } from 'react-router-dom';
function Serv() {
  let history = useHistory()
  function cbutton(){
    history.push('/Crop Recommendation')
  }
  function fbutton(){
    history.push('/Fertilizer Recommendation')
  }
  return (
    <div className='Serv'>
        <div class = 'container'>
    <div class = 'card'>
      <div class = 'image'>
        <img src ={'https://wallpapercave.com/wp/wp3115867.jpg'} alt={''} title={'Crop Recommendation'}/>
      </div>
      <div class = 'content'>
        <h3>Crop Recommendation</h3>
        <p>Recommendation about the type of crops to be cultivated which best suits the soil based on the soil features.</p>
        <Button className='cbu' variant='outlined' onClick={cbutton}><ArrowRightAltIcon /></Button>
      </div>
    </div>    
  </div>
  <div class = 'container'>
    <div class = 'card'>
      <div class = 'image'>
      <img src={'https://media.istockphoto.com/photos/farmer-hand-giving-plant-organic-humus-fertilizer-to-plant-picture-id684977254?k=20&m=684977254&s=612x612&w=0&h=CzHJu6pim8-jUTeRp6aX-aA52MyUn8T7favdzqtqIKs='} alt={'Fertilizer'} title={'Fertilizer Recommendation'}/>
      </div>
      <div class = 'content'>
        <h3>Fertilizer Recommendation</h3>
        <p>Recommendation about the type of fertilizer best suited for particular soil and recommended crop.</p>
        <Button className='fbu' variant='outlined' onClick={fbutton}><ArrowRightAltIcon /></Button>
      </div>
    </div>    
  </div>
    </div>
  )
}

export default Serv