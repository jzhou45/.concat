import React from 'react';
import Modal from './modal/modal_container';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import { Route, Switch } from 'react-router-dom';
import Splash from './splash/splash';

const App = () => (
    <div>
        <Modal />
        <Splash/>
    </div>
);

export default App;
