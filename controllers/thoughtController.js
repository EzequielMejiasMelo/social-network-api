const {User, Thought} = require('../models');

module.exports = {
    //All thoughts
    getThoughts(req, res){
        Thought.find()
        .then(thought => res.json(thought))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Single Thought
    getThought(req, res){
        Thought.find({_id: req.params.thoughtId})
        .select('-__v')
        .lean()
        .then((thought) => {
            thought ? res.json(thought) : res.status(404).json({message: 'No thought with this ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Create thought
    createThought(req, res){
        Thought.create(req.body)
        .then(thought => res.json(thought))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Update thought
    updateThought(req, res){
        Thought.updateOne({_id: req.params.thoughtId},req.body)
        .then((thought) => {
            thought ? res.json(thought) : res.status(404).json({message: 'No thought with this ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Delete thought
    deleteThought(req, res){
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought) => {
            !thought ? res.status(404).json({message: 'No thought with this ID'}) :
            User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
        })
        .then((user) => {
            user ? res.json({message: 'Thought has been deleted'}) : res.json({message: 'Thought deleted but no user found'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Add reaction
    addReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            thought ? res.json(thought) : res.status(404).json({message: 'No thought with this ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Remove reaction
    removeReaction(req, res){
        Thought.findOneAndRemove(
            {_id: req.params.thoughtId},
            {$pull: {reactions: req.params.reactionId}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            thought ? res.json(thought) : res.status(404).json({message: 'No thought with this ID'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};