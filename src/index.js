const express = require('express');
const app = express();

//Default Resolver
const { getDatas, getData } = require('./defaultResolvers/get');
const { deleteData } = require('./defaultResolvers/delete');

//Movies Resolver
const { postMovie } = require('./moviesResolvers/post');
const { putMovie } = require('./moviesResolvers/put');

//Games Resolver
const { postGame } = require('./gamesResolvers/post');
const { putGame } = require('./gamesResolvers/put');

const movies = require('./data/movies.json');
const games = require('./data/games.json');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.route('/').get((req, res) => {
    res.send('Movies API');
});

app.route('/movies').get((req, res) => {
    return getDatas(req, res, movies);
}).post((req, res) => {
    return postMovie(req, res, movies);
});

app.route('/movies/:id').get((req, res) => {
    return getData(req, res, movies);
}).put((req, res) => {
    return putMovie(req, res, movies);
}).delete((req, res) => {
    return deleteData(req, res, movies, './src/data/movies.json');
});

app.route('/games').get((req, res) => {
    return getGames(req, res, games);
}).post((req, res) => {
    return postGame(req, res, movies);
});;

app.route(`/games/:id`).get((req, res) => {
    return getGame(req, res, gameas);
}).put((req, res) => {
    return putGame(req, res, movies);
}).delete((req, res) => {
    return deleteData(req, res, movies, './src/data/games.json');
});


app.route("*").get((req, res) => res.send("404 not found!"));

app.listen(8080, () => console.log('SERVER IS RUNNING'));