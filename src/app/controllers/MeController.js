const Course = require('../models/course');
const {mutipleToObject} = require('../../util/mongoose');
const course = require('../models/course');

class SiteController{

    //[GET] me/courses
    storedCourses(req, res, next)
    {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {  
                res.render('me/stored-courses', {
                    courses: mutipleToObject(courses),
                    deleteCount
                });
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
