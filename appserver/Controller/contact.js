/* GET contact page*/
const index = (req, res) => {
    res.render('contact', {title: "contact"})
};

module.exports = {
    index
};