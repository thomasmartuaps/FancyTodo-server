const router = require('express').Router()
const UserController = require('../controllers/user')
const TodoController = require('../controllers/todo')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.post('/todos', TodoController.create)
router.get('/todos', TodoController.read)
router.get('/todos/:id', TodoController.readById)
router.put('/todos/:id', TodoController.update)
router.delete('/todos/:id', TodoController.delete)

module.exports = router