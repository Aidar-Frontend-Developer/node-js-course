/* Global setup module.
**
** This module exports an async function that is triggered
** once before all test suites.
**
*/

const path = require('path');
const chalk = require('chalk');

require('dotenv').config({
    path: path.resolve('.env.test'),
});

module.exports = async function() {
    console.log(chalk.green('λ'));
    global.t = 'hello';
};
