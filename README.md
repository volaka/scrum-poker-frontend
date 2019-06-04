# Scrum Poker Web App - Frontend Repository

## Description

This is the frontend repository of 
[Scrum Poker Application](https://github.com/volaka/scrum-poker-backend)

This application is an ReactJS application.

Scrum Poker App is a dummy scrum voting app for scrum master and
developers. Scrum Master can create Sessions/Sprints and con
manage each sprint and its stories. 

A developer can see each stories final point, or can vote
an active story.

## Used Technologies 

Technologies are defined as below:

* ReactJS
* Redux
* Semantic UI (UI Component Library)
* Redux Thunk
* Axios

Development technologies are:

* Babel
* React Hot Loader
* Webpack
* Cypress
* Jest
* Eslint Rallycoding -> [repo](https://github.com/volaka/ESLint-Rallycoding)

## Run Application

To run application, you must run the backend server of scrum 
poker application. You can access it from 
[this link](https://github.com/volaka/scrum-poker-backend)

* `npm start` will start the developer server (w/ webpack-dev-server)
* `npm build` will build the repo and will create a `dist` folder. 
    You can then serve it with nginx|apache or with `npx serve --single dist`
* `npm run build:docker` will create docker image
* `npm run start:docker` will start the created docker container 
    in production.
    > PS: For production environment, backend api url should be set.
        For development environment, webpack-dev-server uses proxy config
        to proxy requests to backend api host. For production server,
        baseURL config in utils/api/constants file should be set to 
        backend url. 