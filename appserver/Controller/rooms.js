/* GET rooms */
const index = (req, res) => {
    res.render('rooms', {title: "rooms"})
};

module.exports = {
    index
};