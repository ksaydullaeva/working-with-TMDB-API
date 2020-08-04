import React, {useEffect, useState} from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import MoviePlay from "./components/MoviePlay/MoviePlay";
import "./App.css";
import Nav from "./components/Nav/Nav";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Nav/>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/movie-details" component={MoviePlay}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
