const Course = require('../models/course');
const {mutipleToObject} = require('../../util/mongoose')

class SiteController{

    storedCourses(req, res, next)
    {
        Course.find({})
            .then((courses) => {
                res.render('me/stored-courses', {courses: mutipleToObject(courses)});
            })
            .catch(next);
    }
}

module.exports = new SiteController;
