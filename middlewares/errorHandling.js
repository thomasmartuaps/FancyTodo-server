function errorHandler(err, req, res, next) {
 if(err.name === 'SequelizeValidationError') {
     let messages = []
     err.errors.forEach(element => {
         messages.push(element.message)
     });
     return res.status(400).json({ name: err.name, messages: messages })
 } else if(err.name === 'SequelizeUniqueConstraintError') {
    let messages = []
    err.errors.forEach(element => {
        messages.push(element.message)
    });
    return res.status(400).json({ name: err.name, messages: messages })
 } else if(err.name === 'JsonWebTokenError') {
     return res.status(400).json({ type: 'JWT error!', message: err.message })
 }
 else if(err.type) {
     return res.status(err.status).json(err)
 } else {
     return res.status(500).json({ error: err })
 }
}

module.exports = errorHandler