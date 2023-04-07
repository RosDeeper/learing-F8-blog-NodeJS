const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/container-form-action', courseController.submitContainer);
router.post('/bin-container-form', courseController.submitBinContainer);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.remove);
router.delete('/:id/force', courseController.forceRemove);
router.get('/:slug', courseController.show);

module.exports = router;
