const express = require('express');
const app = express();
const fs = require('fs');

const movies = require('./data/movies.json');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.route('/').get((req, res) => {
    res.send('Movies API');
});

app.route('/movies')
.get((req, res) => {
    res.header("Content-Type",'application/json');
    res.status(200).send(JSON.stringify(movies, null, 3));
}).post((req, res) => {
    const { id, name, photo, description, casting } = req.body;
    const movie = { id, name, photo, description, casting };
    const findMovie = movies.find(movie => movie.id === id);
    if(findMovie) return res.status(403).send("Já existe um filme com este ID cadastrado");
    movies.push(movie);
    fs.writeFile('./src/data/movies.json', JSON.stringify(movies), err => {
        if(err) throw err;
        res.status(201).send(movies);
    });
});

app.route('/movies/:id').get((req, res) => {
    const id = req.params.id;
    const movie = movies.find(movie => movie.id === id);
    if(!movie) return res.status(400).json("Movie not found!");
    return res.status(200).send(movie);
}).put((req, res) => {
    const { id } = req.params;
    const { name, photo, description, casting } = req.body;
    const movie = { id, name, photo, description, casting };
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if(movieIndex < 0) return res.status(400).json("Movie not found!");
    movie.id = id;
    movie.name = name ? name : movie.name;
    movie.photo = photo ? photo : movie.photo;
    movie.description = description ? description : movie.description;
    movie.casting = casting ? casting : movie.casting;
    fs.writeFile('./src/data/movies.json', JSON.stringify(movies), err => {
        if(err) throw err;
        res.status(200).send(movies);
    });
}).delete((req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if(movieIndex < 0) return res.status(404).json("Movie not found!");
    fs.writeFile('./src/data/movies.json', JSON.stringify(movies), err => {
        if(err) throw err;
        res.status(204).send("Movie deleted!");
    });
});

app.route("*").get((req, res) => res.send("404 not found!"));

app.listen(8080, () => console.log('SERVER IS RUNNING'));