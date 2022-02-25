const router = require('express').Router();

router.route('/');
router.route('/:thoughtId');
router.route('/:thoughtId/reactions');