const router = require('express').Router();

router.route('/');
router.route('/:userId');
router.route('/:userId/friends/:friendId');