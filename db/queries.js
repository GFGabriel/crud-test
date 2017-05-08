const knex = require('./knex')

module.exports = {
  getAll: () => {
    return knex('todo')
            .select()
  },
  getID: (id) => {
    return knex('todo')
            .select()
            .where ('id', id)
            .first()
  },
  postNew: (todo) => {
    return knex('todo')
            .insert(todo, 'id')
  },
  editID: (todo, id) => {
    return knex('todo')
            .where('id', id)
            .update(todo, 'id')
  },
  delete: (id) => {
    return knex('todo')
            .where ('id', id)
            .del()
  }
}

// This is not working
