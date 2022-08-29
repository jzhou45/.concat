import React from 'react';
import Modal from './modal/modal_container';
import { AuthRoute, ProtectedRoute } from '../util/routes_util';
import { Route, Switch } from 'react-router-dom';
import Splash from './splash/splash';
import Nav from './nav/nav'
import Rooms from './rooms/rooms'


const App = () => (
    <div>
        <header>
            <Nav/>
        </header>
        <Modal />
        <Switch>
            <ProtectedRoute path={"/rooms"} component={Nav}/>
            <AuthRoute exact path={"/"} component={Splash} />
        </Switch>
    </div>
);

export default App;
