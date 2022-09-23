const fs = require('fs');

const putMovies = {
    putMovie: (req, res, movies) => {
        const { name, photo, description, casting } = req.body;
        const { id } = req.params;
        const movie = { id, name, photo, description, casting };
        const movieIndex = movies.find(movie => movie.id === id);
        if(movieIndex < 0) return res.status(400).json("Movie not found!");
        movieIndex.id = id;
        movieIndex.name = name ? name : movieIndex.name;
        movieIndex.photo = photo ? photo : movieIndex.photo;
        movieIndex.description = description ? description : movieIndex.description;
        movieIndex.casting = casting ? casting : movieIndex.casting;
        fs.writeFile('./src/data/movies.json', JSON.stringify(movies), err => {
            if(err) throw err;
            res.status(200).send(movies);
        });
    }
}

module.exports = putMovies;