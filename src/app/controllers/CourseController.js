const Course = require('../models/course');
const {singleToObject} = require('../../util/mongoose');

class CourseController {
    //[GET] courses/:slug
    show(req, res, next)
    {
        Course.findOne({slug: req.params.slug})
            .then((course) => {
                res.render('courses/show', {course: singleToObject(course)});
            })
            .catch(next);
    }

    //[GET] courses/create
    create(req, res, next)
    {
        res.render('courses/create');
    }

    //[POST] courses/store
    store(req, res, next)
    {
        //res.json(req.body);
        const course = new Course(req.body);
        course.save()
            .then(res.redirect('/'))
            .catch(next);
    }
}

module.exports = new CourseController;
