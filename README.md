# .concat
<p align="center">
  <img width="300" height="300" style="filter: invert(81%) sepia(11%) saturate(771%) hue-rotate(183deg) brightness(102%) contrast(97%);" src="https://github.com/jzhou45/.concat/blob/main/frontend/src/assets/images/concat_logo.png">
</p>

## Background 

[.concat](https://concat.herokuapp.com) is a MERN stack web application that is geared towards engineers to practice Leetcode questions collaboratively with their friends or classmates. Users would create rooms which they can invite their friends into with a unique room link. There, they can either choose to use one of the default 75 questions or create their own questions. After selecting a question to work on, they can go into the problem's room where there will be live chat functionality that allows for easy communication as well as live share of IDE to make it easy to work together.    

## Technologies Used

**Frontend:** React, Redux

- React is utilized to render components onto the webpage. It handles navigation between different pages and components.
- Redux is used to instantiate and keep localState to store information to be use by the application.

**Backend:** MongoDB, Express.js, Axios, Monaco Editor, and Socket.io

- MongoDb hosts our database online and stores documents used by our application.
- Express.js and Axios will aid by providing middleware so we can utilize our backend to make HTTP request and API calls to retrieve necessary data.
- Monaco Editor will be our sole text and code editor environment for our application. Monaco Editor will provide Users the option to view and edit code with other users.
- Socket.io provides the utility needed for live communication between users.
                                                                     

## Functionality and Features

### User Auth 

User authentication: login, logout, and signup

![](https://github.com/jzhou45/.concat/blob/main/frontend/src/assets/images/user-auth.gif)

### Rooms 

Users can create rooms and invite their friends or classmates to be part of the room. By directly sending the room's link to their friends, they will be prompted to login or create a new account. Users have the option to leave or delete rooms. Upon account creation, every user will have their own personal rooms to work by themselves.

![](https://github.com/jzhou45/.concat/blob/main/frontend/src/assets/images/rooms.gif)

### Problems

Each room contains a list of 75 default problems. Each problem contains a code editor which which will automatically save every few seconds. If users are part of a room, members of the room can use the code editor together. If the 75 questions aren't enough there is the option to create, update, and delete their own problems.

![](https://github.com/jzhou45/.concat/blob/main/frontend/src/assets/images/problems.gif)


### Websocket
Through the use of websockets, users are able to communicate live through the chat. Websocket provides the ability to update and watch each other code in the IDE. This code below demonstrates the use of hooks such as *useEffect* that allows for our chat functionality to have live chat updates on users that join and leave the room.

```
  useEffect(() => {
      socket.emit('joinRoom', {
          message: {
              log: [props.username, "joined the room"],
              timestamp: new Date()
          },
          roomId
      });

      return () => socket.emit('leaveRoom', {
          message: {
              log: [props.username, "left the room"],
              timestamp: new Date()
          },
          roomId
      });
  }, []);
  
  const getTime = (dateObject) => {
        let newDateObject = dateObject;
        if (typeof dateObject === 'string') {
            newDateObject = new Date(dateObject)
        }
        return newDateObject.toLocaleDateString([], {hour: '2-digit', minute: '2-digit'}).split(',')[1]
    }
```
In our ** chat ** feature, it not only allows for live updates of the members within the chat, it also allows users to see the datetime stamps of when they come and go from the chat, as well as the time chats were sent. These chats persist throughout the problems and through user sessions so user can look back at their messages, allowing for an easy flow for group communication. 

![](https://github.com/jzhou45/.concat/blob/main/frontend/src/assets/images/chat.gif)

Our IDE allows for live updates of code but also of timestamps of code updates from the users within the group. Users can also click run to check if their code is correct for that question by running the test cases that the user or the default questions passed in. 

![](https://github.com/jzhou45/.concat/blob/main/frontend/src/assets/images/ide.gif)

### Progress Tracker

As users complete problems, they can check or uncheck the problems as complete. Every user will have their own unique progress tracker reflecting which and how many questions they have completed. The different colors of the progress tracker indicated the questions difficulty.

![](https://github.com/jzhou45/.concat/blob/main/frontend/src/assets/images/progress-tracker.gif)
