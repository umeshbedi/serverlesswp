const serverlesswp = require('serverlesswp');
const { validate } = require('../util/install.js');
const { setup } = require('../util/directory.js');

const pathToWP = '/tmp/wp';

// Move /wp to a writeable location
setup();

exports.handler = async function (event, context) {
    // Serve request via serverlesswp
    const response = await serverlesswp({
        docRoot: pathToWP,
        event: event
    });

    // Validate if WP is installed or needs setup
    const checkInstall = validate(response);
    return checkInstall || response;
};
