import React from 'react';
import ReactDOMClient from 'react-dom/client';
import axios from 'axios';
import './assets/stylesheets/App.scss';
import Root from "./components/root";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
        entities: {
            users: { [window.currentUser.id]: window.currentUser }
        },
        session: { id: window.currentUser.id }
        }
    store = configureStore(preloadedState)
    delete window.currentUser 
  } else {
    store = configureStore()
  };

  const rootContainer = document.getElementById("root");
  const root = ReactDOMClient.createRoot(rootContainer);
  root.render(<Root store={store} />);
});