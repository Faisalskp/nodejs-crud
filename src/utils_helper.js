

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
module.exports.writeFilePromise_helper = (fileLocation, helperName) =>
    new Promise((resolve, reject) => {

        var path = fileLocation

        var path2 = ""
        var myValue = ""
        if (path.includes("helpers")) {
            path2 = path.split('helpers')
            myValue = "helpers"
        }

        let path3 = path2[1].split('\\')

        var path4 = path3[1]

        var path5 = path4 + myValue

        let path6 = path5.split('.')

        let path7 = path6[0]

        let path8 = path6[1]

        if (path8 === "helpers") {
            if (helperName === "users") {
                myString = `const bcrypt = require('bcryptjs');
                            const jwt = require('jsonwebtoken');
    
                            const hashPassword = (password) => new Promise(async (resolve, reject) => {
                                try {
                                    resolve(await bcrypt.hash(password, 12))
                                } catch (error) {
                                    reject(error)
                                }
                            });
    
                            const comparewPassword = (clientPass, dbPass) => new Promise(async (resolve, reject) => {
                                try {
                                    resolve(await bcrypt.compareSync(clientPass, dbPass))
                                } catch (error) {
                                    reject(error)
                                }
                            });
    
                            const formateData = (data) => {
                                data.dob = new Date(data.dob);
                                data.contact = parseInt(data.contact);
                                return data;
                            };
    
                            const generarteToken = (user) => {
                                return jwt.sign({
                                    userId: user._id,
                                    username: user.username,
                                    userRole: user.role
                                }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_SESSION_TIME });
                            };
    
                            module.exports = {
                                hashPassword,
                                comparewPassword,
                                formateData,
                                generarteToken
                            };
                        `
            } else if (helperName === "response") {
                myString = `const success = (res, message, data) => {
                                res.status(200).json({
                                    status: 'Success',
                                    message,
                                    data
                                });
                            };

                            const bad = (res, message) => {
                                res.status(400).json({
                                    status: 'Error',
                                    message
                                });
                            };

                            const notFound = (res) => {
                                res.status(404).json({
                                    status: 'Error',
                                    message: 'Not found!',
                                });
                            };

                            const serverError = (res, data) => {
                                // console.log("server Error", data.message)
                                if (data.message.endsWith('24 hex characters')) {
                                    return bad(res, 'Please provide the valid Id')
                                }
                                if (data.message.startsWith('Cast to ObjectId')) {
                                    return bad(res, 'Please provide the valid Id')
                                }

                                res.status(500).json({
                                    status: 'Error',
                                    message: 'Internal Server Error',
                                    data: data.stack
                                });
                            };

                            const setResponse = (res, { type, message = '', data = {} }) => {
                                switch (type) {
                                    case 'success':
                                        success(res, message, data)
                                        break;
                                    case 'bad':
                                        bad(res, message)
                                        break;
                                    case 'notFound':
                                        notFound(res)
                                        break;
                                    case 'serverError':
                                        serverError(res, data)
                                        break;

                                    default:
                                        break;
                                }
                            };

                            module.exports = {
                                setResponse
                            }
                        `
            } else {
                myString = `
                //const yourLogicd = require('yourLogicd');


                
                // module.exports = { 
                //    yourLogicd
                // };
                `
            }
            fs.writeFile(fileLocation, myString, (err) => {
                err ? reject(err) : resolve();
            });
        }
    });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports.writeFilePromises_helper = (fullPathToHelper, fullPathToIndex, helperName) =>
    new Promise((resolve, reject) => {
        var newString = ``
        var newString2 = ``

        var path = fullPathToHelper

        var path2 = ""
        var myValue = ""
        if (path.includes("helpers")) {
            path2 = path.split('helpers')
            myValue = "helpers"
        }

        let path3 = path2[1].split('\\')

        var path4 = path3[1]

        var path5 = path4 + myValue

        let path6 = path5.split('.')

        let path7 = path6[0]

        let path8 = path6[1]

        if (fs.existsSync(fullPathToIndex)) {
            if (path8 === "helpers") {
                var i;
                var count = 0;
                require('fs').createReadStream(fullPathToIndex)
                    .on('data', function (chunk) {
                        for (i = 0; i < chunk.length; ++i)
                            if (chunk[i] == 10) count++;
                    })
                    .on('end', function () {

                        var serviceCounter1 = count - count + 1
                        var serviceCounter2 = count - 1

                        newString2 = `const ${path7}Helper = require('./${path5}')`
                        newString3 = `${path7}Helper,`

                        let stringToAdd = newString2;
                        let stringToAdd2 = newString3;

                        async function processFile(content, fullPathToIndex) {
                            try {
                                content.splice(serviceCounter1, 0, stringToAdd);
                                content.splice(serviceCounter2, 0, stringToAdd2);
                                fs.unlinkSync(fullPathToIndex)
                                await againCreateFile(fullPathToIndex, content)
                            } catch (error) {

                            }
                        }

                        function againCreateFile(fullPathToIndex, content) {

                            var finalString = ``

                            outputText = content.filter(function (e) {
                                return e.replace(/[\r\n]+/g, '\n')
                            });

                            for (let i of outputText) {
                                finalString = finalString.concat(i + "\n")
                            }

                            setTimeout(() => {
                                fs.writeFile(fullPathToIndex, finalString, (err) => {
                                    err ? reject(err) : resolve();
                                });
                            }, 500)
                        }

                        fs.readFile(fullPathToIndex, async (err, data) => {
                            if (err) throw err;
                            const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
                            processFile(arr, fullPathToIndex);
                        })
                    });
            }
        } else {
            if (path8 === "helpers") {
                newString = `
                    const ${path7}Helper = require('./${path5}')

                    module.exports = {
                        ${path7}Helper,
                    }
                `
                fs.writeFile(fullPathToIndex, newString, (err) => {
                    err ? reject(err) : resolve();
                });
            }
        }


    });
module.exports.readFilePromiseRelative = (fileLocation) =>
    module.exports.readFilePromise(path.join(__dirname, fileLocation));