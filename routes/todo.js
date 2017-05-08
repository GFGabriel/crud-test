const express = require('express');
const router = express.Router();


const validTodo = require('../lib/validations').validTodo
const validId = require('../lib/validations').validId
const queries = require('../db/queries')
const setStatusRenderError = require('../lib/responseHelpers').setStatusRenderError

/* This router is mounted at localhost:3000/todo. Every route that gets defined will come after todo */
router.get('/', function(req, res, next) {
  queries
    .getAll()
    .then(todos => {
      res.render('all', { todos: todos });
    })
});

function respondAndRenderTodo(id, res, viewName) {
  if (validId(id)) {
    queries
      .getID(id)
      .then(todos => {
        res.render(viewName, todos);
      })
  } else {
    setStatusRenderError(res, 500, 'Invalid Id')
  }
}

router.get('/new', function(req, res, next) {
  res.render('new');

});


router.get('/:id', function(req, res, next) {
  const id = req.params.id
  respondAndRenderTodo(id, res, 'single')
});

router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id
  respondAndRenderTodo(id, res, 'edit')
});

function validateTodoRenderError(req, res, callback) {
  if(validTodo(req.body)) {
    let todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority
    }
    callback(todo)
  } else {
    setStatusRenderError(res, 500, 'Invalid Todo')
  }
}

router.post('/', function(req, res, next) {
  validateTodoRenderError(req, res, (todo) => {
    todo.date = new Date()
    queries
      .postNew(todo)
      .then(ids => {
        const id = ids[0]
        res.redirect(`/todo/${id}`)
    })
  })
})

router.put('/:id', function(req, res, next){
  validateTodoRenderError(req, res, (todo) => {
    const id = req.params.id
    // todo.date = new Date()
    queries
      .editID(todo, id)
      .then(() => {
          res.redirect(`/todo/${id}`)
    })
  })
})

router.delete('/:id', function(req, res, next) {
  const id = req.params.id
  if (validId(id)) {
    queries
      .delete(id)
      .then(() => {
        res.redirect('/todo')
      })
  } else {
    setStatusRenderError(res, 500, 'Invalid Id')
  }
})

module.exports = router;
