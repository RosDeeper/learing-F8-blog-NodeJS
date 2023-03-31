const Course = require('../models/course');

class SiteController{
    index(req, res)
    {
        Course.find({})
            .then(function(courses){
                res.json(courses)
            })
            .catch(function(err){
                res.status(400).json(err = 'Error')
            });
        //res.render('home');
    }

    search(req, res)
    {
        res.render('search');
    }
}

module.exports = new SiteController;
