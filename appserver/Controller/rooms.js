const fs = require('fs');
const rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

/* GET rooms */
const index = (req, res) => {
    res.render('rooms', {title: "rooms", rooms})
};

module.exports = {
    index
};