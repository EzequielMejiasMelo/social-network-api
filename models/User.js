const {Schema, model, Types } = require('mongoose');
const thoughtSchema = require('./Thought');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: 30,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //mongoose valid email address
        },
        thoughts: [thoughtSchema],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    }
);

const User = model('users', userSchema);

module.exports = User;