const bcrypt = require('bcryptjs');

const users = [
    {
        name:'Admin User',
        email:'admin@domain.com',
        password:bcrypt.hashSync('Login@12345',10),
        isAdmin:true
    },
    {
        name:'Joe Doe',
        email:'joe@domain.com',
        password:bcrypt.hashSync('Login@12345',10)
    },
    {
        name:'Jane Doe',
        email:'jane@domain.com',
        password:bcrypt.hashSync('Login@12345',10)
    }
];

module.exports = users;