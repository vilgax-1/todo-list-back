const Validator = require("validatorjs");
Validator.useLang("en");

const attributeNames = {
    title: "title",
    name: "name",
    completed: "Task completed"
};

function buildValidator(data, rules) {
    const validator = new Validator(data, rules);
    validator.setAttributeNames(attributeNames);
    return validator;
}

function buildValidator(data, rules) {
    const validator = new Validator(data, rules);
    validator.setAttributeNames(attributeNames);
    return validator;
}

function validateUpdateTask(data){
    const rules = {
        name: "required",
        title: "required",
        completed: "required",
    };
    return buildValidator(data, rules);
}

function validatePatchTask(data){
    const rules = {
        completed: "required",
    }
    return buildValidator(data, rules);
}

function validateCreateTask(data){
    const rules = {
        name: "required",
        title: "required",
        completed: "required",
    };
    return buildValidator(data, rules);
}

module.exports = {
    validateUpdateTask,
    validatePatchTask,
    validateCreateTask,
}