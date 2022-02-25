const {User} = require('../models');

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
            user ? res.json(user) : res.status(404).json({message: 'No user with that ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Update User
    updateUser(req, res){
        User.updateOne({_id: req.params.userId}, req.body)
        .then((user) => {
            user ? res.json(user) : res.status(404).json({message: 'No user with that ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Add friend
    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) => {
            user ? res.json(user) : res.status(404).json({message: 'No user with that ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Remove friend
    removeFriend(req, res){
        User.findOneAndRemove(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) => {
            user ? res.json(user) : res.status(404).json({message: 'No user with that ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};