const router = require('express').Router()
const UserController = require('../controllers/user')
const TodoController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSignIn', UserController.googleSignIn)

router.use(authentication)
router.post('/todos', TodoController.create)
router.get('/todos', TodoController.read)
router.get('/todos/:id', authorization, TodoController.readById)
router.put('/todos/:id', authorization, TodoController.update)
router.delete('/todos/:id', authorization, TodoController.delete)
router.get('/jokes', TodoController.readJoke)

module.exports = router