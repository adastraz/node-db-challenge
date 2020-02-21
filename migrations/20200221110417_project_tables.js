
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', projects => {
            projects.increments()
            projects.text('name').notNullable
            projects.text('description')
            projects.boolean('is_completed').deafaultTo(false)
        })
        .createTable('recources', resources => {
            resources.increments()
            resources.text('name').notNullable()
            resources.text('description')
        })
        .createTable('tasks', task => {
            tasks.increments()
            tasks.text('description').notNullable()
            tasks.text('notes')
            tasks.boolean('is_completed').deafaultTo(false)
            tasks.integer('project_id').unsigned().references('projects.id')
        })
};

exports.down = function(knex) {
  
};
