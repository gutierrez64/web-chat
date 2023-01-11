const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const ChatFilter = require('./components/ChatFilter')

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/client-side/client.html')
})

io.on('connection', (socket)=>{
    console.log(`|SERVER| -> client connected with id: ${socket.id}`)

    socket.emit('server_message', 'SERVER', `you are connected with the id: ${socket.id}`, 'red', 'admin')
    socket.broadcast.emit('server_message', 'SERVER', `${socket.id} connected`, 'red', 'admin')

    socket.on('client-message-requisition', (client, chat)=>{
        let [mode, message] = ChatFilter(chat)
        if(mode && message){
            console.log(`|SERVER| -> ${socket.id}: ${message}`)
            socket.emit('server_message', client, message, 'green', mode)
            socket.broadcast.emit('server_message', client, `|${socket.id}| -> ${message}`, 'blue', mode)
        }
    })
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('server_message', 'SERVER', `${socket.id} left`, 'red', 'admin')
    })
})

const port = 3000;
http.listen(process.env.PORT || port, ()=>{
    console.log(`|SERVER| -> App listening on port ${port}`)
})