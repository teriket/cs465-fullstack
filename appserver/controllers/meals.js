const fs = require('fs');
const meals = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'))

/* GET meals page */
const index = (req, res) => {
    res.render('meals', {title: "meals", meals})
};

module.exports = {
    index
};