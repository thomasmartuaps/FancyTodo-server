const { User } = require('../models')
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        let { email, password } = req.body
        User.create({ email, password })
            .then(response => {
                let payload = {
                    id: response.id,
                    email: response.email
                }
                let token = createToken(payload)
                return res.status(201).json({id: payload.id, email: payload.email, token: token})
            })
            .catch(err => {
                return next(err)
            })
    }
    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({ where: { email: email }})
            .then(response => {
                const decrypted = checkPassword(password, response.password)
                if(!response) {
                    throw { status: 400, type: 'Bad Request', msg: 'Wrong email or password'}
                }
                else if(!decrypted) {
                    throw { status: 400, type: 'Bad Request', msg: 'Wrong email or password' }
                }
                else {
                    let payload = {
                        id: response.id,
                        email: response.email
                    }
                    let token = createToken(payload)
                    return res.status(200).json({ id: payload.id, email: payload.email, token: token })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = UserController