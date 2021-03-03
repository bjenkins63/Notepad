const todos = require("../db/db");

class Todo {

    // baseUrl = "https://jsonplaceholder.typicode.com/todos";
    // update

    update({ id, ...payload }) {
        let index;
        let update = todos.find((todo, i) => {
            index = i;
            todo.id === id
        });
        update = {
            id: id,
            ...payload
        };
        return todos;
    }

    // create

    create(payload) {
        todos.push(payload);
        return todos;
    }

    // delete

    remove(id) {
        let index;
        const todo = todos.find((t, i) => {
            index = i;
            t.id === id
        });
        todos.splice(index, 1);
    }

    // read

    read(id) {
        return todos.find((t) => t.id === id);
    }

    list() {
        return todos;
    }

}

module.exports = new Todo();