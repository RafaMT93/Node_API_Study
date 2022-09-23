const fs = require('fs');

const deleteMovie = {
    deleteMovie: (req, res, movies) => {
        const { id } = req.params;
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if(movieIndex < 0) return res.status(404).json("Movie not found!");
        movies.splice(movieIndex, 1);
        fs.writeFile('./src/data/movies.json', JSON.stringify(movies), err => {
            if(err) throw err;
            res.status(204).send("Movie deleted!");
        });
    }
}

module.exports = deleteMovie;