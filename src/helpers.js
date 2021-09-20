
const os = require('os');
const files = require('./files');
const prettier = require('prettier');
const chalk = require('chalk');
const path = require('path');

const findRouter = async (folderName, componentName, templatePath) => {
    if (files.directoryExists(folderName)) {
        files.createFile(folderName, componentName, templatePath)
    } else {
        console.log(chalk.red(`Error : ${folderName} folder does't exist`));
        console.log(chalk.green(`Solution : please create new directory with name of ${folderName} at root folder`));
    }
}

module.exports.existFiles = async (componentName, templatePath) => {
    findRouter("routes", componentName, templatePath)
    findRouter("services", componentName, templatePath)
    findRouter("controllers", componentName, templatePath)
    findRouter("models", componentName, templatePath)
}

module.exports.buildPrettifier = (prettierConfig) => (text) =>
    prettier.format(text, prettierConfig);