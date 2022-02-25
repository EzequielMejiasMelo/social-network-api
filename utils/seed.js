const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {usernames, emails, thoughts} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected');
    
    await User.deleteMany({});

    await Thought.deleteMany({});

    const users = [];

    for (let i=0; i < 10; i++){
        let username = usernames[i];
        let email = emails[i];
        
        users.push({
            username: username,
            email: email,
        });
    }

    await User.collection.insertMany(users);

    for (let i=0; i < 10; i++){
        let user = await User.findOne({username: usernames[i]});
        let thought = thoughts[i];
        let username = user.username;
        await Thought.collection.insertOne({
            thoughtText: thought,
            username: username,
        })
    }

    console.info('Seeding finished');
    process.exit(0);
});