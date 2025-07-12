/* GET meals page */
const index = (req, res) => {
    res.render('meals', {title: "meals"})
};

module.exports = {
    index
};