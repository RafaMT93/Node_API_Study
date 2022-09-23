const getMovies = {
    getMovies: (req, res, movies) => {
        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(movies, null, 3));
    },
    getMovieForId: (req, res, movies) => {
        const id = req.params.id;
        const movie = movies.find(movie => movie.id === id);
        if(!movie) return res.status(400).json("Movie not found!");
        return res.status(200).send(movie);
    }
};

module.exports = getMovies;