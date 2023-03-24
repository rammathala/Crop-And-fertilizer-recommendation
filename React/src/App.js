import "./App.css";
import React from 'react'
import CropRecommender from "./components/CropRecommender";
import FertilizerRecommender from "./components/FertilizerRecommender";
import Body from './components/Body';
import Header from './components/Header';
import { BrowserRouter as  Router, Route } from 'react-router-dom';
import Desc from './components/Desc';
import Serv from './components/Serv';
import Footer from './components/Footer';

function App() {
  return (
        <Router>
    <div className="App">
     
        <Route exact path='/'>
        <Header/>
        <Body/>
        <Desc/>
        <Serv/>
        <Footer/>
        </Route>
        <Route exact path='/Crop Recommendation'>
        <Header/>
        <CropRecommender/>
        </Route>
        <Route exact path='/Fertilizer Recommendation'>
        <Header/>
         <FertilizerRecommender/>
        </Route>

    </div>
    </Router>

  );
}

export default App;
