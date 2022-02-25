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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('users', userSchema);

module.exports = User;