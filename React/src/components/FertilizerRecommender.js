import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import api from "../api/recommenderapi"
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "./croprecommenderoutput.css"
import {fertilizerData} from "./Data"
import Loading from './Loading';
import './Fertilizer.css'


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: "280px",
      backgroundColor: "whitesmoke",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        maxWidth: 550,
    },
    table: {
        minWidth: 450,
    },
}));

function FertilizerRecommender() {
    const [formData, setFormData] = useState({
        Temparature:"",
        Humidity:"",
        Moisture:"",
        soil_type:"select",
        crop_type:"select",
        Nitrogen:"",
        Potassium:"",
        Phosphorous:"",
    })

    const [predictionData, setPredictionData] = useState({})

    const [loadingStatus, setLoadingStatus] = useState(false)
    
    const classes = useStyles();


    const formRenderData = [
        {
           name:"Nitrogen",
           description:"Amount Of Nitrogen in Soil"
        },
        {
            name:"Potassium",
            description:"Amount of Potassium in Soil"
         },
         {
            name:"Phosphorous",
            description:"Amount of Phosphorous in Soil"
         },
         {
            name:"Temparature",
            description:"Temperature (in Celcius)"
         },
         {
            name:"Humidity",
            description:"Humidity (in %)"
         },
         {
            name:"Moisture",
            description:"Moisture in Soil"
         }
    ]

    const soilTypes = ['Sandy', 'Loamy', 'Black', 'Red', 'Clayey']
    const cropTypes = ['Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Paddy', 'Barley', 'Wheat', 'Millets', 'Oil seeds', 'Pulses', 'Ground Nuts']

    const handleChange = (e, changeKey=undefined) => {
        // console.log(changeKey, e.target.value)
        let newData = {...formData}
        if(changeKey) {
            newData[changeKey] = e.target.value
        }
        else newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    const handleClick = async () => {

        setLoadingStatus(true)
        
        const request = new FormData()

        for(let key in formData) {
            request.append(key, formData[key])
        }

        const response = await api.post(
            "/predict_fertilizer",
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

    const predictedFertilizer = fertilizerData[predictionData.final_prediction]



    if (predictionData.final_prediction) {

        const outputComponent = (


            <div className="output_container">
                <Card className={`${classes.root} output_container__card`}>
                        <CardMedia
                        component="img"
                        alt={predictedFertilizer.title}
                        height="225"
                        image={predictedFertilizer.imageUrl}
                        title={predictedFertilizer.title}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <b>Predicted Fertilizer: </b>{predictedFertilizer.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {predictedFertilizer.description}
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
        <div className="Fertilizer">
            <div>
                {
                    predictionData.error && 
                    <Alert style={{marginTop:"20px"}} severity="error"> { predictionData.error } </Alert>
                }
            </div>
            <div className='rpage1'>
       <form >
        <p className='in1'>Fertilizer Recommendation</p>
        <p className='m1'>Get informed advice on fertilizer based on soil</p>
        {
                    formRenderData.map((formAttribute) => {
                        return(<div className='spa'>
                        <h5>{formAttribute.description}</h5>
                        <input id={formAttribute.name} key={formAttribute.name} 
                        onChange={(e) => handleChange(e)}
                        name={formAttribute.name} className='fla1' type="text" value={formData[formAttribute.name]}/>
                        </div>)
                       
                    })
        }
        <div className='spa'>
        <h5>Soil type</h5>
        <select className='fla1' value={formData.soil_type}
                    onChange={(e) => handleChange(e, "soil_type")}
                    SelectProps={{
                        native: true,
                    }} id="soil_type"
                    name="soil_type">
        <option key={"select"} value={"select"}>
                    {"Select"}
                    </option>
                    {soilTypes.map((soiltype) => (
                        <option key={soiltype} value={soiltype}>
                        {soiltype}
                        </option>
                    ))}
        </select>
        </div>
        <div className='spa'>
        <h5>Crop type</h5>
        <select className='fla1' value={formData.crop_type}
                    onChange={(e) => handleChange(e, "crop_type")}
                    SelectProps={{
                        native: true,
                    }} id="soil_type"
                    name="soil_type">
        <option key={"select"} value={"select"}>
                    {"Select"}
                    </option>
                    {cropTypes.map((croptype) => (
                        <option key={croptype} value={croptype}>
                        {croptype}
                        </option>
                    ))}
        </select>
        </div>
        <Button onClick={()=>handleClick()} className='butt1' type="submit" color="primary" variant="contained" >Predict Fertilizer</Button>
      </form>
    </div>

            </div>
       
    )
}

export default FertilizerRecommender
