const db = require('../config/db.js')
const todoModel = '../schema/list.js'

const TodolistDb = db.Todolist;

const Todolist = TodolistDb.import(todoModel)

const getTodolistById = async function(id) {
    const todolist = await Todolist.findAll({
        where: {
            user_id: id
        },
        attributes: ['id', 'content', 'status']
    });

    return todolist;
}

const createTodolist = async function(data) {
    await Todolist.create({
        user_id: data.id,
        content: data.content,
        status: data.status
    })
    return true
}

const removeTodolist = async function(id, userId) {
    const result = await Todolist.destroy({
        where: {
            id,
            user_id: userId
        }
    })
    return result == 1;
}

const updateTodolist = async function(id, userId, status){
    const result = await Todolist.update(
        {
            status
        },
        {
            where:{
                id,
                user_id: userId
            }
        }
    )
    return result[0] === 1;
}

module.exports = {
    getTodolistById,
    createTodolist,
    updateTodolist,
    removeTodolist
}