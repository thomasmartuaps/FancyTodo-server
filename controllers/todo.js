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
            .then(response => {
                return res.status(201).json(response)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
    static read(req, res) {
        Todo.findAll({ where: { UserId: req.decoded.id || 1 }})
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
    static readById(req, res) {
        Todo.findOne({ where: { id: req.params.id }})
            .then(response => {
                if(!response) {
                    return res.status(404).json({ type: '404 Not found', msg: 'Item not found!'})
                }
                else {
                    return res.status(200).json(response)
                }
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
    static update(req, res) {
        let task = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(task, { where: { id: req.params.id }, returning: true })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(err => {
                return res.status
            })
    }
}

module.exports = TodoController