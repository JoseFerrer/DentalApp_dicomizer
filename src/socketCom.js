import openSocket from 'socket.io-client'

import config from './config/configFile.json'

const IP = config.NetConfig.ip
const Port = config.NetConfig.port
var StrStart = "http://"


//const socket = openSocket(StrStart.concat(IP,":",Port));

const patientSend = (props) => {
    console.log("Llego al socket", props)
    var socket = openSocket(StrStart.concat(IP,":",Port))//('http://localhost:22223')
    socket.emit('Send Patient data', props)
}

export {patientSend}