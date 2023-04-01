const Course = require('../models/course');
const {singleToObject} = require('../../util/mongoose');

class CourseController {
    show(req, res, next)
    {
        Course.findOne({slug: req.params.slug})
            .then((course) => {
                res.render('courses/show', {course: singleToObject(course)});
            })
            .catch(next);
    }
}

module.exports = new CourseController;
