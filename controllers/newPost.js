module.exports = (req, res) => {
    if (req.session.userId) {
        res.render('create')
        return
    }

    res.redirect('/auth/login')
}