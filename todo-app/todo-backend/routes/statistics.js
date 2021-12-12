const express = require('express');
const router = express.Router();

const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const nTodos = Number((await redis.getAsync('nTodos')) || 0);
  res.json({added_todos: nTodos});
});

module.exports = router;