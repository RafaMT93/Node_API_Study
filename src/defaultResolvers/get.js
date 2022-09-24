const getData = {
    getDatas: (req, res, arr) => {
        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(arr, null, 3));
    },
    getData: (req, res, arr) => {
        const id = req.params.id;
        const i = arr.find(i => i.id === id);
        if(!i) return res.status(400).json(`Game Not Found`);
        return res.status(200).send(i);
    }
};

module.exports = getData;