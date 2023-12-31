const express = require("express");
const {createServer} = require('node:http');
const {Server} = require("socket.io");
const bodyParser = require("body-parser");
const cors = require('cors');



const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://blocktrader.vercel.app",
        methods: ['GET', 'POST'],
    },
});

// Add this
// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.emit('message', {
        message: `anil has joined the chat room`,
    });
});
const port = 3001;
let corsOptions = {
    origin: ['https://blocktrader.vercel.app', "52.89.214.238", "34.212.75.30", "54.218.53.128", "52.32.178.7"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", async (req, res) => {
    res.json({message: "Welcome to application."});
});
app.post('/webhook', (req, res) => {
    console.log(req.body, 'webhook')
    io.emit('webhook', req.body);
    res.send('OK');
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});