import React from 'react';
import Modal from './modal/modal_container';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
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
        <Route exact path={"/"} component={Splash} />
        <Route path={"/rooms"} component={Rooms}/>
    </div>
);

export default App;
