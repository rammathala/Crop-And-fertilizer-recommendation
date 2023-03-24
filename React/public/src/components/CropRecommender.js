import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import api from "../api/recommenderapi"
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "./croprecommenderoutput.css"
import {cropData} from "./Data"
import Loading from './Loading';
import './Crop.css'



const useStyles = makeStyles({
    root: {
      maxWidth: 550,
    },
    table: {
        minWidth: 450,
    },
});


function CropRecommender() {

    const [formData, setFormData] = useState({
        N:"",
        P:"",
        K:"",
        temperature:"",
        humidity:"",
        ph:"",
        rainfall:""
    })

    const [predictionData, setPredictionData] = useState({})

    const [loadingStatus, setLoadingStatus] = useState(false)

    const handleChange = (e) => {
        let newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    const handleClick = async () => {

        setLoadingStatus(true)
        
        const request = new FormData()

        for(let key in formData) {
            request.append(key, formData[key])
        }

        const response = await api.post(
            "/predict_crop",
            request
        )
        
        const responseData = response.data
        setPredictionData(responseData)
        setLoadingStatus(false)
        setFormData('')
    }

    const handleBackClick = () => {
        setPredictionData({})
    }

    const classes = useStyles();

    const predictedCrop = cropData[predictionData.final_prediction]


    if(predictionData.final_prediction) {


        const outputComponent = (


            <div className="output_container">
                <Card className={`${classes.root} output_container__card`}>
                        <CardMedia
                        component="img"
                        alt={predictedCrop.title}
                        height="225"
                        image={predictedCrop.imageUrl}
                        title={predictedCrop.title}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <b>Predicted Crop: </b>{predictedCrop.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {predictedCrop.description}
                        </Typography>
                        <br/>
                        </CardContent>
                    <CardActions>
                        <Button onClick={()=>handleBackClick()} className="back__button" variant="contained" size="small" color="primary">
                        GO BACK
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )

        return outputComponent
    }


    else if(loadingStatus) {

        return <Loading />

    }
    else return (
   <div className='Crop1'>
       <div>
                {
                    predictionData.error && 
                    <Alert style={{marginTop:"20px"}} severity="error"> { predictionData.error } </Alert>
                }
       </div>
       <div className='rpage'>
       <form className='form'>
        <p className='in'>Crop Recommendation</p>
        <p className='m'>Find out the most suitable crop to grow in your farm</p>
        <div className='spa1'>
        <h5>Amount of Nitrogen in soil</h5>
        <input onChange={(e) => handleChange(e)} value={formData.N} id="N" name="N"  className='fla' type="text" required />
        </div>
        <div className='spa1'> 
        <h5>Amount of Pottasium in soil</h5>
        <input onChange={(e) => handleChange(e)} value={formData.K}  id="K" name="K" className='fla' type="text" required />
        </div>
        <div className='spa1'>
        <h5>Amount of Phosphorous in soil</h5>
        <input onChange={(e) => handleChange(e)} value={formData.P}  id="P" name="P"className='fla' type="text" required />
        </div>
        <div className='spa1'>
        <h5>Temperature (in Celsius)</h5>
        <input onChange={(e) => handleChange(e)} value={formData.temperature} id="temperature" name="temperature" className='fla' type="text" required />
        </div>
        <div className='spa1'>
        <h5>Humidity (in %)</h5>
        <input onChange={(e) => handleChange(e)} value={formData.humidity}  id="humidity" name="humidity" className='fla' type="text" required />
        </div>
        <div className='spa1'>
        <h5>pH of soil</h5>
        <input onChange={(e) => handleChange(e)} value={formData.ph} id="ph" name="ph" className='fla' type="text" required />
        </div>
        <div className='spa1'> 
        <h5>Rainfall (in mm)</h5>
        <input onChange={(e) => handleChange(e)} value={formData.rainfall}  id="rainfall" name="rainfall" className='fla' type="text" required />
        </div> 
        <Button onClick={()=>handleClick()} className='butt' type="submit" color="primary" variant="contained" >Predict Crop</Button>
        </form>
            </div>
            </div>
    )
}

export default CropRecommender
