const ChatFilter = (message)=>{
    if(!message){return[undefined, undefined]}
    let message_tree = {}
    let pointer = 1
    for(let x = 0;x < message.length;x++){
        if(message[x] === '/'){
            message_tree['/'] = {
                value:''
            }
        }
        else if(message[x] === ' '){
            message_tree['message'] = {
                value:''
            }
            break
        }
        if(!message_tree['/']){return[undefined, undefined]}
        if(message[x] != '/'){
            message_tree['/'].value += message[x]
        }
        pointer++
    }
    if(message_tree.message){
        for(let x = pointer;x < message.length;x++){
            message_tree.message.value += message[x]
        }
    }

    if(message_tree['/'].value != '/'){
        return [message_tree['/'].value, message_tree['message'].value]
    }
    else{
        return [undefined, undefined]
    }
}

module.exports = ChatFilter