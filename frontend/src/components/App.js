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
import ProblemItemContainer from './problems/problem_item';
import IDE from './ide/ide';
import Chat from './chat/chat'
import ProgressTracker from './progress_tracker/progress_tracker'

const App = () => (
    <div>
        <header>
            <Nav/>
            {/* <Chat /> */}
        </header>
        <Modal />
        <ProgressTracker/>
        <Switch>
            <ProtectedRoute path={"/rooms/:roomId/problems/:problemId"} component={ProblemItemContainer}/>
            <Route path={"/rooms/:roomId/join"} component={NewJoinContainer}/>
            <ProtectedRoute path={"/rooms/:roomsId"} component={Problems}/>
            <ProtectedRoute path={"/rooms"} component={Rooms}/>
            <AuthRoute exact path={"/"} component={Splash} />
        </Switch>
    </div>
);

export default App;
