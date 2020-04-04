const { User } = require('../models')
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


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
                return res.status(201).json({
                    id: payload.id, 
                    email: payload.email, 
                    token: token,
                    avatar: `https://api.adorable.io/avatars/200/${response.email}.png` 
                })
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
                    return res.status(200).json({ 
                        id: payload.id, 
                        email: payload.email, 
                        token: token, 
                        avatar: `https://api.adorable.io/avatars/200/${response.email}.png` 
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
    static googleSignIn(req, res, next) {
        let googleToken = req.headers.token
        let newUser = {}
        client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.CLIENT_ID
        }).then(ticket => {
            let payload = ticket.getPayload()
            let userId = payload['sub']
            let userEmail = payload.email
            newUser.email = payload.email
            newUser.password = process.env.DEFAULT_PASS
            // console.log({payload: payload})
            return User.findOne({where: {email: userEmail}})
        })
        .then(response => {
            if(response) {
                let payload = {
                    id: response.id,
                    email: response.email
                }
                let token = createToken(payload)
                // console.log('user existed')
                return res.status(200).json({
                    id: payload.id, 
                    email: payload.email, 
                    token: token, 
                    avatar: `https://api.adorable.io/avatars/200/${response.email}.png` 
                })
            }
            else {
                // console.log(response)
                // console.log('No such user')
                // console.log(newUser)
                return User.create(newUser)
            }
        })
        .then(response => {
            let payload = {
                id: response.id,
                email: response.email
            }
            let token = createToken(payload)
            // console.log('User created through Google')
            return res.status(201).json({
                id: payload.id, 
                email: payload.email, 
                token: token, 
                avatar: `https://api.adorable.io/avatars/200/${response.email}.png` 
            })
        })
        .catch(err => next(err))
    }
}

module.exports = UserController