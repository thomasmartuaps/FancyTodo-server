const { User } = require('../models')

class UserController {
    static register(req, res) {
        let { email, password } = req.body
        User.create({ email, password })
    }
}

module.exports = UserController