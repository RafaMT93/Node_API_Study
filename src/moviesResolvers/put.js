const fs = require('fs');

const putMovies = {
    putMovie: (req, res, movies) => {
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
    }
}

module.exports = putMovies;