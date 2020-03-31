const { User } = require('../models')
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class UserController {
    static register(req, res) {
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
                return res.status(500).json(err)
            })
    }
    static login(req, res) {
        let { email, password } = req.body
        User.findOne({ where: { email: email }})
            .then(response => {
                const decrypted = checkPassword(password, response.password)
                if(!response) {
                    return res.status(400).json({ type: 'Bad Request', msg: 'Wrong email or password'})
                }
                else if(!decrypted) {
                    return res.status(400).json({ type: 'Bad Request', msg: 'Wrong email or password' })
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
                return res.status(500).json(err)
            })
    }
}

module.exports = UserController