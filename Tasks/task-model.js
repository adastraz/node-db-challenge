const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    addResource,
    findResources,
    remove,
    update
}

function find(){
    return db('tasks')
}

function findById(id){
    return db('tasks')
        .where({ id })
        .first()
}

function findResources(taskId){
    return db('resources')
        .join('tasks as t', 't.id', 'resources.task_id')
        .select('resources.*', 't.notes as Task Notes', 't.description as Task Description')
        .where('project_id', taskId)
}

function addResource(resource, id){
    return db('resources')
        .insert({...resource, task_id: id})
}

function update(id, changes){
    return db('tasks')
        .where({ id })
        .update(changes)
}

function remove(id){
    return db('tasks')
        .where({ id })
        .del()
}