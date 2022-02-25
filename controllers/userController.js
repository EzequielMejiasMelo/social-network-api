const {User, Thought} = require('../models');

module.exports = {
    //All users
    getUsers(req, res){
        User.find()
        .then(users => res.json(users))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Single user
    getUser(req, res){
        User.find({_id: req.params.userId})
        .select('-__v')
        .lean()
        .then((user) => {
            user ? res.json(user) : res.status(404).json({message: 'No user with that ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Create user
    createUser(req, res){
        User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
    },
    //Delete user
    deleteUser(req, res){
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => {
            !user ? res.status(404).json({message: 'No user with that ID'}) : res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};