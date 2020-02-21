const db = require('../data/db-config')

module.exports = {
    add, 
    addTask,
    update,
    remove,
    findById,
    findTasks,
    find
}

function find(){
    return db('projects')
}

function findById(id){
    return db('projects')
        .where({ id })
        .first()
}

function update(id, changes){
    return db('projects')
        .where({ id })
        .update(changes)
}

function findTasks(projectId){
    return db('tasks')
        .join('projects as p', 'p.id', 'tasks.project_id')
        .select('tasks.*', 'p.name as Project Name', 'p.description as Project Description')
        .where('project_id', projectId)
}

function add(project){
    return db('projects')
        .insert(project, 'id')
}

function addTask(task, id){
    return db('tasks')
        .insert({...task, project_id: id})
}

function remove(id){
    return db('projects')
        .where({ id })
        .del()
}