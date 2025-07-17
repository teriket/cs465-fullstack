var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'))

/* GET travel view */
const index = (req, res) => {
    res.render('travel', {title : 'travel page', trips})
};

module.exports = {
    index
};