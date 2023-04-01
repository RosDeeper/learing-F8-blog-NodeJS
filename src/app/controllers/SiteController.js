const Course = require('../models/course');
const {mutipleToObject} = require('../../util/mongoose')

class SiteController{

    index(req, res, next)
    {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: mutipleToObject(courses)
                });
            })
            .catch(next);
    }

    search(req, res)
    {
        res.render('search');
    }
}

module.exports = new SiteController;
