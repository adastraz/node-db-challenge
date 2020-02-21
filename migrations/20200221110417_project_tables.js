
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
            resources.integer('project_id').unsigned().referances('projects.id')
        })
        .createTable('tasks', task => {
            tasks.increments()
            tasks.text('description').notNullable()
            tasks.text('notes')
            tasks.boolean('is_completed').deafaultTo(false)
            tasks.integer('project_id').unsigned().references('projects.id')
        })
        .createTable('task_resources', pr => {
            pr.increments()
            pr.integer('tasks_id').unsigned().references('tasks.id')
            pr.integer('resource_id').unsigned().references('resources.id')
        })
};

exports.down = function(knex) {
  
};
