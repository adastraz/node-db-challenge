
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', projects => {
            projects.increments()
            projects.text('name').notNullable()
            projects.text('description')
            projects.boolean('is_completed').defaultTo(false)
        })
        .createTable('tasks', tasks => {
            tasks.increments()
            tasks.text('description').notNullable()
            tasks.text('notes')
            tasks.boolean('is_completed').defaultTo(false)
            tasks.integer('project_id').unsigned().references('projects.id')
        })
        .createTable('resources', resources => {
            resources.increments()
            resources.text('name').notNullable()
            resources.text('description')
            resources.integer('task_id').unsigned().references('tasks.id')
        })
        .createTable('task_resources', pr => {
            pr.increments()
            pr.integer('tasks_id').unsigned().references('resources.task_id')
            pr.integer('resource_id').unsigned().references('resources.id')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('task_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects')
};
