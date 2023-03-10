# EAS todo app

> I wanted to learn more about using firebase as a database to store todos. The project has full CRUD support and login authentication with firebase.
> Live demo [_here_](https://eas-todos-app.netlify.app/). <!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Contact](#contact)

## General Information

- Project aims to give the user the ability to add a list of todos. These todos can be updated, deleted and created using CRUD.
- I undertook the project because i wanted to learn more about working with a cloud based database.
- Todos are personal, and can be viewed on login.

## Technologies Used

- firebase: ^9.17.2,
- react: ^18.2.0,
- react-dom: ^18.2.0,
- sass: ^1.58.3

## Features

- Full CRUD functionality
- Login authentication

## Screenshots

![App screenshot](./src/assets/screenshot-todo.JPG)

## Setup

To start the project, open the console and type:
`npm install`
then
`npm run dev`
to start the dev server.

## Usage

1. First and foremost you need to create a new project in firebase, follow their setup to add a project. Once done, enter the console of the project, and select "Firestore database" and create a collection. You will be provided with a firebase config file which will be important.

2. Create a firebase.js file in the src directory and paste in the config code provided by firebase like so:

```jsx
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR-DATA",
  authDomain: "YOUR-DATA",
  projectId: "YOUR-DATA",
  storageBucket: "YOUR-DATA",
  messagingSenderId: "YOUR-DATA",
  appId: "YOUR-DATA",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

3. For CRUD functionality to work, you need to update the "todos" string in all crud operations to whatever you've called your collection. If you have named your collection "todos", no changes needs to be made

```jsx
const createTodo = async (e) => {
  e.preventDefault();
  if (input === "") {
    setError(true);
    return;
  } else {
    setError(false);
  }
  await addDoc(collection(db, "YOUR_COLLECTION_NAME"), {
    text: input,
    completed: false,
  });
  setInput("");
};
```

## Project Status

Project is: _complete_ /

## Acknowledgements

- This project was based on [this tutorial](https://www.youtube.com/watch?v=drF8HbnW87w&ab_channel=CodeCommerce) by Code Commerce.

## Contact

Created by [@eivindsimonsen](https://www.linkedin.com/in/eivind-simonsen-9469121b9/) - feel free to contact me!
Visit my portfolio [here](https://www.easimonsen.com/)
