

const fs = require('fs');
const path = require('path');

module.exports.requireOptional = (filePath) => {
    try {
        return require(filePath);
    } catch (e) {
        // We want to ignore 'MODULE_NOT_FOUND' errors, since all that means is that
        // the user has not set up a global overrides file.
        // All other errors should be thrown as expected.
        if (e.code !== 'MODULE_NOT_FOUND') {
            throw e;
        }
    }
};

// module.exports.mkDirPromise = (dirPath) =>
//     new Promise((resolve, reject) => {
//         fs.mkdir(dirPath, (err) => {
//             err ? reject(err) : resolve();
//         });
//     });
module.exports.readFilePromise = (fileLocation) =>
    new Promise((resolve, reject) => {
        fs.readFile(fileLocation, 'utf-8', (err, text) => {
            err ? reject(err) : resolve(text);
        });
    });
module.exports.writeFilePromise = (fileLocation) =>
    new Promise((resolve, reject) => {

        var path = fileLocation

        var path2 = ""
        var myValue = ""
        if (path.includes("routes")) {
            path2 = path.split('routes')
            myValue = "routes"
        }
        if (path.includes("models")) {
            path2 = path.split('models')
            myValue = "models"
        }
        if (path.includes("controllers")) {
            path2 = path.split('controllers')
            myValue = "controllers"
        }
        if (path.includes("services")) {
            path2 = path.split('services')
            myValue = "services"
        }

        let path3 = path2[1].split('\\')

        var path4 = path3[1]

        var path5 = path4 + myValue

        let path6 = path5.split('.')

        let path7 = path6[0]

        let path8 = path6[1]

        if (path8 === "routes") {
            myString = `var express = require('express');
        var router = express.Router();
        
        const { ${path7}Controller } = require('../controllers')
        /* ${path7} routes listing. -- code crud --  */
       
        router.post('/addOne', ${path7}Controller.addOne);
        router.get('/findAll', ${path7}Controller.findAll);
        router.get('/findOne/:id', ${path7}Controller.findOne);
        router.put('/editOne/:id', ${path7}Controller.editOne);
        router.delete('/deleteOne/:id', ${path7}Controller.deleteOne);
        
        module.exports = router;
        `
            fs.writeFile(fileLocation, myString, (err) => {
                err ? reject(err) : resolve();
            });
        }
        if (path8 === "models") {
            myString = `const mongoose = require("mongoose")

                        const ${path7}Schema = new mongoose.Schema({
                            value1: {
                                type: String,
                                required: true
                            },
                            value2: {
                                type: String,
                                required: true
                            }
                        })

                        const ${capitalizeFirstLetter(path7)} = mongoose.model("${path7}", ${path7}Schema)
                        module.exports = ${capitalizeFirstLetter(path7)};
                    `
            fs.writeFile(fileLocation, myString, (err) => {
                err ? reject(err) : resolve();
            });
        }
        if (path8 === "services") {
            myString = `const {${capitalizeFirstLetter(path7)}}  = require("../models")
            
            const addOne = async (req)  => {
                try {
                    return "write you logics"
                } catch (error) {

                }
            }

            const findOne = async ({ params }) => {
                try {
                    return "write you logics"
                } catch (error) {

                }
            }

            const deleteOne = async ({ params }) => {
                try {
                    return "write you logics"
                } catch (error) {

                }
            }

             const editOne = async ({ params }) => {
                try {
                    return "write you logics"
                } catch (error) {

                }
            }

            const findAll = async ({ query }) => {
                try {
                    return "write you logics"
                } catch (error) {

                }
            }

            module.exports = {
                        addOne,
                        findAll,
                        findOne,
                        editOne,
                        deleteOne,
            }`

            fs.writeFile(fileLocation, myString, (err) => {
                err ? reject(err) : resolve();
            });
        }
        if (path8 === "controllers") {
            myString = `const { ${path7}Service }  = require("../services")
            
                    const findAll = async (req, res) => {
                        try {
                            const data = await ${path7}Service.findAll(req)
                            console.log(data) 
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const addOne = async (req, res) => {
                        try {
                            const data = await ${path7}Service.addOne(req)
                            console.log(data)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const editOne = async (req, res) => {
                        try {
                            const data = await ${path7}Service.editOne(req)
                            console.log(data)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const deleteOne = async (req, res) => {
                        try {
                            const data = await ${path7}Service.deleteOne(req)
                            console.log(data)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const findOne = async (req, res) => {
                        try {
                            const data = await ${path7}Service.findOne(req)
                            console.log(data)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    module.exports = {
                        addOne,
                        findAll,
                        findOne,
                        editOne,
                        deleteOne,
                }
            `

            fs.writeFile(fileLocation, myString, (err) => {
                err ? reject(err) : resolve();
            });
        }

    });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports.writeFilePromises = (fullPath, fileLocation, folderNameDirs) =>
    new Promise((resolve, reject) => {
        var newString = ``
        var newString2 = ``
        var newStringEnd = `module.exports = router;`


        var path = fullPath

        var path2 = ""
        var myValue = ""
        if (path.includes("routes")) {
            path2 = path.split('routes')
            myValue = "routes"
        }
        if (path.includes("models")) {
            path2 = path.split('models')
            myValue = "models"
        }
        if (path.includes("services")) {
            path2 = path.split('services')
            myValue = "services"
        }
        if (path.includes("controllers")) {
            path2 = path.split('controllers')
            myValue = "controllers"
        }

        let path3 = path2[1].split('\\')

        var path4 = path3[1]

        var path5 = path4 + myValue

        let path6 = path5.split('.')

        let path7 = path6[0]

        let path8 = path6[1]

        if (fs.existsSync(fileLocation)) {
            if (path8 === "routes") {
                newString2 = `const ${path7}Routes = require('./${path5}')
                    router.use('/${path7}', ${path7}Routes);
                `
                let stringToAdd = newString2;
                let indexPosition = 4;

                async function processFile(content, fileLocation) {
                    try {
                        content.splice(indexPosition, 0, stringToAdd);
                        fs.unlinkSync(fileLocation)
                        againCreateFile(fileLocation, content)
                    } catch (error) {

                    }
                }

                function againCreateFile(fileLocation, content) {
                    var finalString = ``
                    for (let i of content) {
                        finalString = finalString.concat(i + "\n")
                    }
                    setTimeout(() => {
                        fs.writeFile(fileLocation, finalString, (err) => {
                            err ? reject(err) : resolve();
                        });
                    }, 500)
                }

                fs.readFile(fileLocation, async (err, data) => {
                    if (err) throw err;
                    const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
                    processFile(arr, fileLocation);
                })
            }
            if (path8 === "models") {
                var i;
                var count = 0;
                require('fs').createReadStream(fileLocation)
                    .on('data', function (chunk) {
                        for (i = 0; i < chunk.length; ++i)
                            if (chunk[i] == 10) count++;
                    })
                    .on('end', function () {

                        var modelCounter1 = count - count + 1
                        var modelCounter2 = count - 1

                        newString2 = `const  ${capitalizeFirstLetter(path7)} = require('./${path5}')`
                        newString3 = `${capitalizeFirstLetter(path7)},`

                        let stringToAdd = newString2;
                        let stringToAdd2 = newString3;

                        async function processFile(content, fileLocation) {
                            try {
                                content.splice(modelCounter1, 0, stringToAdd);
                                content.splice(modelCounter2, 0, stringToAdd2);
                                fs.unlinkSync(fileLocation)
                                await againCreateFile(fileLocation, content)
                            } catch (error) {

                            }
                        }

                        function againCreateFile(fileLocation, content) {

                            var finalString = ``

                            outputText = content.filter(function (e) {
                                return e.replace(/[\r\n]+/g, '\n')
                            });

                            for (let i of outputText) {
                                finalString = finalString.concat(i + "\n")
                            }

                            setTimeout(() => {
                                fs.writeFile(fileLocation, finalString, (err) => {
                                    err ? reject(err) : resolve();
                                });
                            }, 500)
                        }

                        fs.readFile(fileLocation, async (err, data) => {
                            if (err) throw err;
                            const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
                            processFile(arr, fileLocation);
                        })
                    });
            }
            if (path8 === "services") {
                var i;
                var count = 0;
                require('fs').createReadStream(fileLocation)
                    .on('data', function (chunk) {
                        for (i = 0; i < chunk.length; ++i)
                            if (chunk[i] == 10) count++;
                    })
                    .on('end', function () {

                        var serviceCounter1 = count - count + 1
                        var serviceCounter2 = count - 1

                        newString2 = `const ${path7}Service = require('./${path5}')`
                        newString3 = `${path7}Service,`

                        let stringToAdd = newString2;
                        let stringToAdd2 = newString3;

                        async function processFile(content, fileLocation) {
                            try {
                                content.splice(serviceCounter1, 0, stringToAdd);
                                content.splice(serviceCounter2, 0, stringToAdd2);
                                fs.unlinkSync(fileLocation)
                                await againCreateFile(fileLocation, content)
                            } catch (error) {

                            }
                        }

                        function againCreateFile(fileLocation, content) {

                            var finalString = ``

                            outputText = content.filter(function (e) {
                                return e.replace(/[\r\n]+/g, '\n')
                            });

                            for (let i of outputText) {
                                finalString = finalString.concat(i + "\n")
                            }

                            setTimeout(() => {
                                fs.writeFile(fileLocation, finalString, (err) => {
                                    err ? reject(err) : resolve();
                                });
                            }, 500)
                        }

                        fs.readFile(fileLocation, async (err, data) => {
                            if (err) throw err;
                            const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
                            processFile(arr, fileLocation);
                        })
                    });
            }
            if (path8 === "controllers") {
                var i;
                var count = 0;
                require('fs').createReadStream(fileLocation)
                    .on('data', function (chunk) {
                        for (i = 0; i < chunk.length; ++i)
                            if (chunk[i] == 10) count++;
                    })
                    .on('end', function () {

                        var controllerCounter1 = count - count + 1
                        var controllerCounter2 = count - 1

                        newString2 = `const ${path7}Controller = require('./${path5}')`
                        newString3 = `${path7}Controller,`

                        let stringToAdd = newString2;
                        let stringToAdd2 = newString3;

                        async function processFile(content, fileLocation) {
                            try {
                                content.splice(controllerCounter1, 0, stringToAdd);
                                content.splice(controllerCounter2, 0, stringToAdd2);
                                fs.unlinkSync(fileLocation)
                                await againCreateFile(fileLocation, content)
                            } catch (error) {

                            }
                        }

                        function againCreateFile(fileLocation, content) {

                            var finalString = ``

                            outputText = content.filter(function (e) {
                                return e.replace(/[\r\n]+/g, '\n')
                            });

                            for (let i of outputText) {
                                finalString = finalString.concat(i + "\n")
                            }

                            setTimeout(() => {
                                fs.writeFile(fileLocation, finalString, (err) => {
                                    err ? reject(err) : resolve();
                                });
                            }, 500)
                        }

                        fs.readFile(fileLocation, async (err, data) => {
                            if (err) throw err;
                            const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
                            processFile(arr, fileLocation);
                        })
                    });
            }
        } else {
            if (path8 === "routes") {
                newString = `var express = require('express');
                var router = express.Router();


                const ${path7}Routes = require('./${path5}') 
                router.use('/${path7}', ${path7}Routes); 

            `
                fs.writeFile(fileLocation, newString.concat(newStringEnd), (err) => {
                    err ? reject(err) : resolve();
                });
            }
            if (path8 === "models") {
                newString = `const ${capitalizeFirstLetter(path7)} = require('./${path5}')


                    module.exports = {

                        ${capitalizeFirstLetter(path7)},
                    }`
                fs.writeFile(fileLocation, newString, (err) => {
                    err ? reject(err) : resolve();
                });
            }
            if (path8 === "services") {
                newString = `
                    const ${path7}Service = require('./${path5}')

                    module.exports = {
                        ${path7}Service,
                    }
                `
                fs.writeFile(fileLocation, newString, (err) => {
                    err ? reject(err) : resolve();
                });
            }
            if (path8 === "controllers") {
                newString = `
                    const ${path7}Controller = require('./${path5}')

                    module.exports = {
                        ${path7}Controller,
                    }
                `
                fs.writeFile(fileLocation, newString, (err) => {
                    err ? reject(err) : resolve();
                });
            }

        }


    });
module.exports.readFilePromiseRelative = (fileLocation) =>
    module.exports.readFilePromise(path.join(__dirname, fileLocation));