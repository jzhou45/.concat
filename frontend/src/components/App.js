import React from 'react';
import Modal from './modal/modal_container';
import { AuthRoute, ProtectedRoute } from '../util/routes_util';
import { Route, Switch } from 'react-router-dom';
import Splash from './splash/splash';
import Nav from './nav/nav'
import Rooms from './rooms/rooms'
import css from "../assets/stylesheets/App.scss"
import Problems from './problems/problems';
import Ide from './ide/ide';

const App = () => (
    <Ide />
);

export default App;
