const files = require('./files');
const chalk = require('chalk');

module.exports.createHelper = async (dirName, helperName) => {
    if (files.directoryExists(dirName)) {
        files.createFile_Helpers(dirName, helperName)
    } else {
        console.log(chalk.red(`Error : ${dirName} folder does't exist`));
        console.log(chalk.green(`Solution : please create new directory with name of ${dirName} at root folder`));
    }
}
