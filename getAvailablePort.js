const net = require('net');

function getAvailablePort (port = 4423) {
    const server = net.createServer().listen(port);
    return new Promise((resolve) => {
        server.on('listening', () => {
            server.close();
            resolve(port);
        });
        server.on('error', (e) => {
            if (e.code === 'EADDRINUSE') {
                resolve(getAvailablePort(port + 1));
            } else {
                throw e;
            }
        });
    });
}

module.exports = getAvailablePort;
