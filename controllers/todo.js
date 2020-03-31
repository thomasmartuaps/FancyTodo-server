const { Todo } = require('../models')

class TodoController {
    static create(req, res) {
        let newTask = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: req.decoded.id || 1
        }
        Todo.create(newTask)
            .then()
    }
}

module.exports = TodoController