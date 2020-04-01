const { Todo } = require('../models')

class TodoController {
    static create(req, res, next) {
        let newTask = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: req.user.id
        }
        Todo.create(newTask)
            .then(response => {
                return res.status(201).json(response)
            })
            .catch(err => {
                return next(err)
            })
    }
    static read(req, res, next) {
        Todo.findAll({ where: { UserId: req.user.id}})
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(err => {
                return next(err)
            })
    }
    static readById(req, res, next) {
        Todo.findOne({ where: { id: req.params.id }})
            .then(response => {
                if(!response) {
                    throw { status: 404, type: '404 Not found', msg: 'Item not found!' }
                }
                else {
                    return res.status(200).json(response)
                }
            })
            .catch(err => {
                return next(err)
            })
    }
    static update(req, res, next) {
        let task = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(task, { where: { id: req.params.id }, returning: true })
            .then(response => {
                return res.status(200).json(response[1][0])
            })
            .catch(err => {
                return next(err)
            })
    }
    static delete(req, res, next) {
        Todo.destroy({ where: { id: req.params.id }, returning: true })
            .then(response => {
                return res.status(200).json({ status: response, message: `Item id ${req.params.id} has been deleted` })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = TodoController