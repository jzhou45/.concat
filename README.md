# .concat
<p align="center">
  <img width="300" height="300" src="https://github.com/jzhou45/.concat/blob/main/frontend/src/assets/images/concat_logo.png">
</p>

## Background 

[.concat](https://concat-mern.herokuapp.com) is a MERN stack web application that is geared towards engineers to practice Leetcode questions collaboratively with their friends or classmates. There will be live chat functionality that allows for easy communication as well as live share of IDE to make it easy to work together.                                      
## Functionality and Features

### User Auth 
  - User authentication: login, logout, and signup
  
### Rooms 
  - Users can create rooms and invite their friends or classmates to be part of the room. 
  - Users can choose to leave rooms and delete rooms.
  - Users will have their own personal rooms to work by themselves upon account creation
[]()

### Problems
  - Each room contains a list of default problems
  - As users complete problems, they can check or uncheck the problem as complete
  - Each problem contains a code editor
  - If users are in a room, they can use code editor together
  - Users can create, update, and delete their own problems
[]()


### Websocket
  - Through the use of websockets, users are able to communicate live through the chat.
  - Websocket provides the ability to update and watch each others code in the IDE
  
~ USE CHAT.JSX LINES 18-40, i think this is pretty good code to show ~
[]()

### Progress Tracker
  - Users will have a progress tracker
  - Progress tracker will update as user completes problems
[]()

## Technologies Used

**Frontend:** React, Redux

- React is utilized to render components onto the webpage. It handles navigation between different pages and components.
- Redux is used to instantiate and keep localState to store information to be use by the application.

**Backend:** MongoDB, Express.js, Axios, Monaco Editor, and Socket.io

- MongoDb hosts our database online and stores documents used by our application.
- Express.js and Axios will aid by providing middleware so we can utilize our backend to make HTTP request and API calls to retrieve necessary data.
- Monaco Editor will be our sole text and code editor environment for our application. Monaco Editor will provide Users the option to view and edit code with other users.
- Socket.io provides the utility needed for live communication between users.

## Wireframes
[Figma Link](https://www.figma.com/file/LxU7q48cAq6uXADcnfOyKs/.concat)                                 
                                     
