const Course = require('../models/course');
const {singleToObject} = require('../../util/mongoose');
const course = require('../models/course');

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
            .then(res.redirect('/me/courses'))
            .catch(next);
    }

    //[GET] courses/:id/edit
    edit(req, res, next)
    {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {course: singleToObject(course)});
            })
            .catch(next);
    }

    //[PUT] courses/:id
    update(req, res, next)
    {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect('/me/courses');
            })
            .catch(next);
    }

    //[DELETE] courses/:id
    remove(req, res, next)
    {
        Course.delete({_id: req.params.id})
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    //[DELETE] courses/:id/force
    forceRemove(req, res, next)
    {
        Course.deleteOne({_id: req.params.id})
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    //[PATCH] courses/:id/restore
    restore(req, res, next)
    {
        Course.restore({_id: req.params.id})
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    //[POST] courses/container-form-action
    submitContainer(req, res, next)
    {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIDs}})
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
            default: res.send('Invalid');
        }
    }

    //[POST] courses/bin-container-form
    submitBinContainer(req, res, next)
    {
        switch(req.body.action) {
            case 'restore':
                Course.restore({_id: {$in: req.body.deletedCourseIDs}})
                .then(() => {
                    res.redirect('back');
                })
                .catch(next);
                break;

            case 'delete':
                Course.deleteMany({_id: {$in: req.body.deletedCourseIDs}})
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                    break;
                    
            default: res.send('Invalid');
        }
    }
}

module.exports = new CourseController;
