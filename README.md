
# Scoreboard project

This project was created for my friend who needed a simple scoreboard app for an event, where several teams competed against each other in various competitions and the score needed to be stored and computed along the way. A chart of all the teams had to be displayed on a projector alongside with their logo.

The app needed to run offline and persist the state (the whole evening cannot fail if the browser window is closed or computer shuts down for some reason). So I decided to use the [redux-storage](https://github.com/michaelcontento/redux-storage) package alongside with hashHistory from the [react-router](https://github.com/reactjs/react-router) ([react-router-redux](https://github.com/reactjs/react-router-redux)). It works great!

## Used technologies and packages

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reactjs/redux)
- [redux-storage](https://github.com/michaelcontento/redux-storage)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)

## Development

1. Clone the repo
2. Install all dependencies using `npm install`
3. Run the Webpack Dev Server by `npm run dev`
4. View the app in your browser at http://localhost:8080

The app does not implement hot reloading, so you must refresh the browser to see your changes.

To create a production version of the app, run the `npm run build` command, which will run Webpack in production mode. The output will be stored in the `/app/bundle.js` file.

## Tests

The app needed to be assembled as fast as possible and unit testing was skipped (what a silly idea it was to write an app fast without unit tests...).

## Todo

- write tests
- i18n (all the labels are in Czech at the moment)
- runtime configuration