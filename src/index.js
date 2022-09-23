const express = require('express');
const app = express();

//Resolvers
const { getMovies, getMovieForId } = require('./moviesResolvers/get');
const { postMovie } = require('./moviesResolvers/post');
const { putMovie } = require('./moviesResolvers/put');
const { deleteMovie } = require('./moviesResolvers/delete');

const movies = require('./data/movies.json');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.route('/').get((req, res) => {
    res.send('Movies API');
});

app.route('/movies').get((req, res) => {
    return getMovies(req, res, movies);
}).post((req, res) => {
    return postMovie(req, res, movies);
});

app.route('/movies/:id').get((req, res) => {
    return getMovieForId(req, res, movies);
}).put((req, res) => {
    return putMovie(req, res, movies);
}).delete((req, res) => {
    return deleteMovie(req, res, movies);
});

app.route("*").get((req, res) => res.send("404 not found!"));

app.listen(8080, () => console.log('SERVER IS RUNNING'));