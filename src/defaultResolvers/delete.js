const fs = require('fs');

const deleteData = {
    deleteData: (req, res, arr, json) => {
        const { id } = req.params;
        const index = arr.findIndex(i => i.id === id);
        if(index < 0) return res.status(404).json("Not found!");
        arr.splice(index, 1);
        fs.writeFile(json, JSON.stringify(arr), err => {
            if(err) throw err;
            res.status(204).send("Deleted!");
        });
    }
}

module.exports = deleteData;