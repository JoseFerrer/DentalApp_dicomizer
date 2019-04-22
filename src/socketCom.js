import openSocket from 'socket.io-client'

import config from './config/configFile.json'

const IP = config.NetConfig.ip
const Port = config.NetConfig.port
var StrStart = "http://"


const patientSend = (props) => {
    var socket = openSocket(StrStart.concat(IP,":",Port))
    socket.emit('Send Patient data', props)
}

export {patientSend}