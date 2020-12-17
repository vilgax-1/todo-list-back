const fastify = require('fastify');

const build = (opts = {}) => {
    const app = fastify(opts);

    require("./routes/todo")(app);

    app.register(require("fastify-cors"), {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    });

    return app;
}

module.exports = build;
