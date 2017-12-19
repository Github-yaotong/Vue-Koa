const Sequlize = require('sequelize');

const Todolist = new Sequlize('mysql://root:root@localhost/todolist',{
    define: {
        timestamps: false
    }
})

module.exports = {
    Todolist
}