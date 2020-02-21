const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    remove,
    update
}

function find(){
    return db('resources')
}

function findById(id){
    return db('resources')
        .where({ id })
        .first()
}

function update(id, changes){
    return db('resources')
        .where({ id })
        .update(changes)
}

function remove(id){
    return db('resources')
        .where({ id })
        .del()
}