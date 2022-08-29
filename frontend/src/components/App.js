import React from 'react';
import Modal from './modal/modal_container';
import { AuthRoute, ProtectedRoute } from '../util/routes_util';
import { Route, Switch } from 'react-router-dom';
import Splash from './splash/splash';
import Nav from './nav/nav'
import Rooms from './rooms/rooms'
import css from "../assets/stylesheets/App.scss"


const App = () => (
    <div>
        <header>
            <Nav/>
        </header>
        <Modal />
        <Switch>
            <ProtectedRoute path={"/rooms"} component={Rooms}/>
            <AuthRoute exact path={"/"} component={Splash} />
        </Switch>
    </div>
);

export default App;
