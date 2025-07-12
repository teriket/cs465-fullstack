/* GET Homepage */
const index = (req, res) => {
    res.render('about', {title: "about"})
};

module.exports = {
    index
};