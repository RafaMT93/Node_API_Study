const fs = require('fs');

const postGame = {
    postGame: (req, res, games) => {
        const { id, title, photo, description, platforms, age } = req.body;
        const game = { id, title, photo, description, platforms, age };
        const findGame = games.find(game => game.id === id);
        if(findGame) return res.status(403).send(`There is already a game with this id!`);
        games.push(game);
        fs.writeFile('./src/data/games.json', JSON.stringify(games), err => {
            if(err) throw err;
            res.status(201).send(games);
        })
    }
}

module.exports = postGame;