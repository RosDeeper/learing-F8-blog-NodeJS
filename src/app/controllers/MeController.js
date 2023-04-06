const Course = require('../models/course');
const {mutipleToObject} = require('../../util/mongoose')

class SiteController{

    //[GET] me/courses
    storedCourses(req, res, next)
    {
        Course.find({})
            .then((courses) => {
                res.render('me/stored-courses', {courses: mutipleToObject(courses)});
            })
            .catch(next);
    }

    //[GET] me/courses/bin
    binCourses(req, res, next)
    {
        Course.findDeleted({})
            .then((courses) => {
                res.render('me/bin-courses', {courses: mutipleToObject(courses)});
            })
            .catch(next);
    }
}

module.exports = new SiteController;
