/* GET news page */
const index = (req, res) => {
    res.render('news', {title: "news"})
};

module.exports = {
    index
};