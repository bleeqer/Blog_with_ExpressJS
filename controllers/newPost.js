module.exports = (req, res) => {
    
    
    if (req.session.userId) {
        const data = req.flash('data')[0]
        var title = ""
        var content = ""
        if (typeof data != "undefined") {
            title = data.title
            content = data.content
        }

        res.render('create', {
            errors: req.flash('validationErrors'),
            title: title,
            content: content
        })
    } else {
        res.redirect('/auth/login')
    }
}