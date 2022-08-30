import React from 'react';
import Modal from './modal/modal_container';
import { AuthRoute, ProtectedRoute } from '../util/routes_util';
import { Switch, Route} from 'react-router-dom';
import Splash from './splash/splash';
import Nav from './nav/nav'
import Rooms from './rooms/rooms'
import css from "../assets/stylesheets/App.scss"
import Problems from './problems/problems';
import NewJoinContainer from './rooms/new_join'

const App = () => (
    <div>
        <header>
            <Nav/>
        </header>
        <Modal />
        <Switch>
            <Route path={"/rooms/:roomId/join"} component={NewJoinContainer}/>
            <ProtectedRoute path={"/rooms/:roomsId"} component={Problems}/>
            <ProtectedRoute path={"/rooms"} component={Rooms}/>
            <AuthRoute exact path={"/"} component={Splash} />
        </Switch>
    </div>
);

export default App;
