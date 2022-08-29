import React from 'react';
import Modal from './modal/modal_container';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import Splash from './splash/splash';
import Nav from './nav/nav'


const App = () => (
    <div>
        <Modal />
        <Route exact path={"/"} component={Splash} />
        <Route path={"/rooms"} component={Nav}/>
    </div>
);

export default App;
