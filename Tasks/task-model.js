const db = require('../data/db-config')

module.exports = {
  findById,
  addResource,
  findResources
}

function findById(id){
    return db('tasks')
        .where({ id })
        .first()
}

function findResources(taskId){
    return db('resources')
        .join('tasks as t', 't.id', 'resources.task_id')
        .select('resources.*', 't.name as Task Name', 't.description as Task Description')
        .where('project_id', taskId)
}

function addResource(resource, id){
    return db('resources')
        .insert({...resource, task_id: id})
}