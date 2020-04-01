function errorHandler(err, req, res, next) {
 if(err.name === 'SequelizeValidationError') {
     let messages = []
     err.error.forEach(element => {
         messages.push(element.message)
     });
     return res.status(400).json(messages)
 } else if(err.type) {
     return res.status(err.status).json(err)
 } else {
     return res.status(500).json({ error: err })
 }
}

module.exports = errorHandler