import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import NavBar from '../components/NavBar';
import App from '../containers/App'
import NewMotorcycle from '../containers/NewMotorcycle'
  

const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/new" component={NewMotorcycle} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
