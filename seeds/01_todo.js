//title - text
//priority - int 1, 2, 3, 4
//description - text
//done - boolean
//date - datetime

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {title: 'Create a CRUD app', priority: 1, date: new Date()},
        {title: 'Play a game', priority: 2, date: new Date()},
        {title: 'Do some dishes', priority: 3, date: new Date()},
      ]);
    });
};
