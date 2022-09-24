const fs = require('fs');

const putGame = {
    putGame: (req, res, games) => {
        const { title, photo, description, platforms, age } = req.body;
        const { id } = req.params;
        const gameIndex = games.find(movie => movie.id === id);
        if(gameIndex < 0) return res.status(400).json("Movie not found!");
        gameIndex.id = id;
        gameIndex.title = title ? title : gameIndex.title;
        gameIndex.photo = photo ? photo : gameIndex.photo;
        gameIndex.description = description ? description : gameIndex.description;
        gameIndex.casting = casting ? casting : gameIndex.casting;
        gameIndex.platforms = platforms ? platforms : gameIndex.platforms;
        gameIndex.age = age ? age : gameIndex.age;
        fs.writeFile('./src/data/games.json', JSON.stringify(games), err => {
            if(err) throw err;
            res.status(200).send(games);
        });
    }
}

module.exports = putGame;