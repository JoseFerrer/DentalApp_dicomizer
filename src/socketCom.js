import openSocket from 'socket.io-client'

const patientSend = (props) => {
    console.log("Llego al socket", props)
    var socket = openSocket('http://localhost:22223')
    socket.emit('Send Patient data', props)
}

export {patientSend}