const fs = require('fs');

const postMovies = {
    postMovie: (req, res, movies) => {
        const { id, name, photo, description, casting } = req.body;
        const movie = { id, name, photo, description, casting };
        const findMovie = movies.find(movie => movie.id === id);
        if(findMovie) return res.status(403).send("Já existe um filme com este ID cadastrado");
        movies.push(movie);
        fs.writeFile('./src/data/movies.json', JSON.stringify(movies), err => {
            if(err) throw err;
            res.status(201).send(movies);
        });
    }
}

module.exports = postMovies;