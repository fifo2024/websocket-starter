const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3000;

const server = express().listen(PORT, () => console.log(`listening on ${PORT}`));

const wss = new SocketServer({server});

wss.on('connection', (ws) => {
    console.log('Client connneted');

    const sendNowTime = setInterval(() => {
        ws.send(String(new Date()));
    }, 1000);

    ws.on('message', (data) => {
        let clients = wss.clients;

        clients.forEach((client) => {
            client.send(data + Math.random());
        });
        // ws.send(data);
    });

    ws.on('close', () => {
        console.log('Close connnected');
    });
});
