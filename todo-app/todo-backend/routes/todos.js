const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todoToChange = await Todo.findById(req.todo._id);

  let text = todoToChange.text;
  let done = todoToChange.done;

  if (req.body.text) text = req.body.text;
  if (req.body.done) done = req.body.done;

  const changedTodo = await Todo.findByIdAndUpdate(req.todo._id, { text: text, done: done }, { new: true });

  res.json(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
