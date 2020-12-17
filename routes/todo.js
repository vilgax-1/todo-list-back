const todoController = require("../controllers/todo");

module.exports = fastify => {
    fastify.get("/todos", todoController.allTodo);
    fastify.get("/todo/:id", todoController.selectOneTodo);
    fastify.post("/todos", todoController.addTodo);
    fastify.put("/todo/:id", todoController.updateTodo);
    fastify.patch("/todos/:id", todoController.patchTodo);
    fastify.delete("/todos/:id", todoController.deleteTodo);
}