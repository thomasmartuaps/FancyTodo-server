const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token)
        User.findOne({ where: { id: decoded.id }})
            .then(result => {
                if(result) {
                    req.user = {
                        id: result.id,
                        email: result.email
                    }
                    return next()
                }
                else {
                    console.log('lewat sini')
                    throw { status: 404, type: '404 Not Found', msg: 'User not found' }
                }
            })
            .catch(err => {
                console.log('lewat sini juga')
                throw { status: 401, type: 'Unauthorized', msg: 'User unauthenticated' }
            })
    } catch (err) {
        console.log('nyasar sini')
        next(err)
    }
}

module.exports = authentication