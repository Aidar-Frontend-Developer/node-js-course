/* Global teardown modle.
**
** This module exports an async function that is triggered
** once after all test suites.
**
*/

const chalk = require('chalk');

module.exports = function() {
    // eslint-disable-next-line no-console
    console.log(chalk.red('λ'));
};
