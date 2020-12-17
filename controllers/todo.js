const enviroment = require("../enviroment");
const { client } = require('../database');
const { validateCreateTask, validateUpdateTask, validatePatchTask } = require('../utils/validation');

const addTodo = async (req, res) =>{
    const validation = validateCreateTask(req.body);
    if(validation.fails()){
        return res.status(422).send(validation.errors.all());
    }
    try{
        const { name, title, completed  } = req.body;
        const task = (await client.query(`INSERT INTO todo (name, title, completed) VALUES ('${name}', '${title}', ${completed})`))
        if(task){
            res.status(200).send({
                ok: true,
                message: 'Task created success successfully',
            });
        }
    }catch(err){
        res.status(500).send({
            ok: false,
            err,
        });
    }
}

const selectOneTodo  = async (req, res) =>{
    const { id } = req.params;
    try{
        const task = (await client.query(`SELECT * FROM todo WHERE id = ${id}`)).rows;  
        res.status(200).send({
            task
        });
    }catch(err){
        res.status(500).send({
            ok: false,
            err
        });
    }
}

const allTodo = async (req, res) =>{
    const { rows  } = await client.query("SELECT * FROM todo");
    res.status(200).send({
        rows
    })
}

const deleteTodo = async (req, res) =>{
    const { id } = req.params;
    try{
        const task = await client.query(`DELETE FROM todo WHERE id=${id}`);
        if(task){
            res.status(200).send({
                ok: true,
                message: 'Deleted'
            });
        }else{
            res.status(400).send({
                ok: false,
                message: 'Task not found',
            });
        }
    }catch(err){
        res.status(500).send({
            ok: false,
            err
        });
    }
}

const updateTodo = async (req, res) =>{
    const validation = validateUpdateTask(req.body);
    if(validation.fails()){
        return res.status(422).send(validation.errors.all());
    }
    try{
        const { id, name, title, completed } = req.body;
        const task = await client.query(`UPDATE todo SET completed=${completed}, name='${name}', title='${title}' WHERE id=${id}`)
        res.status(200).send({
            ok: true,
            message: 'updated'
        });
    }catch(err){
        res.status(500).send({
            ok: false,
            err
        });
    }
}

const patchTodo = async (req, res) =>{
    const validation = validatePatchTask(req.body);
    if(validation.fails()){
        return res.status(422).send(validation.errors.all());
    }

    try{
        const { id } = req.params;
        const { completed } = req.body;
        const task = await client.query(`UPDATE todo SET completed = ${completed} WHERE  id=${id}`);
        if(task){
            res.status(200).send({
                ok: true,
                message: 'updated'
            });
        }else{
            res.status(400).send({
                ok: false,
                message: 'not found'
            })
        }
    }catch(err){
        res.status(500).send({
            ok: false,
            err
        })
    }
}

module.exports = {
    addTodo,
    selectOneTodo,
    allTodo,
    deleteTodo,
    updateTodo,
    patchTodo
}; 