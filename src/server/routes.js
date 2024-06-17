const Register = require("../controllers/authController");
const Login = require("../controllers/authController");
const Logout = require("../controllers/authController");
const postHistory = require("../controllers/historyController");
const getHistory = require("../controllers/historyController");
require('../services/firebase');
require('../services/firestore');

const routes = [
    {
        method: 'POST',
        path: '/auth/register',
        handler: Register,
    },
    {
        method: 'POST',
        path: '/auth/login',
        handler: Login,
    },
    {
        method: 'POST',
        path: '/auth/logout',
        handler: Logout,
    },
    {
        method: 'POST',
        path: '/user/history',
        handler: postHistory,
    },
    {
        method: 'GET',
        path: '/user/history',
        handler: getHistory,
    }

]

module.exports = routes;