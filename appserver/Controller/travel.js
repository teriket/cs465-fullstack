/* GET travel view */
const index = (req, res) => {
    res.render('travel', {title : 'travel page'})
};

module.exports = {
    index
};