const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const {
    requireOptional,
    mkDirPromise,
    readFilePromiseRelative,
    writeFilePromise,
    writeFilePromises
} = require('./utils');

const {
    writeFilePromise_helper,
    writeFilePromises_helper
} = require('./utils_helper');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },

    createFile: (folderName, fileName, templatePath) => {
        try {
            const componentDir = `${folderName}/${fileName}.${folderName}.js`;
            const componentDirs = `${folderName}/index.js`;
            const fullPathToComponentDir = path.resolve(componentDir);
            const fullPathToComponentDirs = path.resolve(componentDirs);
            const folderNameDirs = path.resolve(folderName);
            if (fs.existsSync(fullPathToComponentDir)) {
                console.log(chalk.blue(`--------------- ${folderName} ---------------`));
                console.log(`file already exists ${componentDir}`)
                console.log(chalk.blue(`--------------------------------------`));
            } else {
                console.log(chalk.yellow(`going to genrate ${componentDir}`));
                // Start by creating the directory that our component lives in.
                writeFilePromise(fullPathToComponentDir)
                    .then((resp) => {
                        // console.log(resp)
                    })
                    .then((template) => {
                        writeFilePromises(fullPathToComponentDir, fullPathToComponentDirs, folderNameDirs)
                    })
                    // .then((template) =>
                    //     // Replace our placeholders with real data (so far, just the component name)
                    //     template.replace(/COMPONENT_NAME/g, componentName)
                    // )
                    // .then((template) =>
                    //     // Format it using prettier, to ensure style consistency, and write to file.
                    //     writeFilePromise(filePath, prettify(template))
                    // )
                    // .then((template) => {
                    //     logItemCompletion('Component built and saved to disk.');
                    //     return template;
                    // })
                    // .then((template) =>
                    //     // We also need the `index.js` file, which allows easy importing.
                    //     writeFilePromise(indexPath, prettify(indexTemplate))
                    // )
                    // .then((template) => {
                    //     logItemCompletion('Index file built and saved to disk.');
                    //     return template;
                    // })
                    // .then((template) => {
                    //     logConclusion();
                    // })
                    .catch((err) => {
                        console.error(err);
                    });
                console.log(chalk.green(`successfully genrate ${componentDir}`));
            }
        } catch (err) {
            console.error(err)
        }
    },

    createFile_Helpers: (dirName, helperName) => {
        try {
            const helperDir = `${dirName}/${helperName}.${dirName}.js`;
            const helperIndex = `${dirName}/index.js`;

            const fullPathToHelper = path.resolve(helperDir);
            const fullPathToIndex = path.resolve(helperIndex);

            if (fs.existsSync(fullPathToHelper)) {
                console.log(chalk.blue(`--------------- ${dirName} ---------------`));
                console.log(`file already exists ${helperDir}`)
                console.log(chalk.blue(`--------------------------------------`));
            } else {
                console.log(chalk.yellow(`going to genrate ${helperDir}`));

                writeFilePromise_helper(fullPathToHelper, helperName)
                    .then((resp) => {
                        // console.log(resp)
                    })
                    .then((template) => {
                        writeFilePromises_helper(fullPathToHelper, fullPathToIndex, helperName)
                    })

                    .catch((err) => {
                        console.error(err);
                    });
                console.log(chalk.green(`successfully genrate ${dirName}`));
            }
        } catch (err) {
            console.error(err)
        }
    }
};