import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import openSocket from 'socket.io-client'

import { connect } from 'react-redux'
import { choose, patselected } from '../actions/index'

import config from '../config/configFile.json'

const IP = config.NetConfig.ip
const Port = config.NetConfig.port
var StrStart = "http://"


const socket = openSocket(StrStart.concat(IP,":",Port));
const lenArr = 7

const results = (data) => {
  var i, paciente;
  var results = [];

  for (i = 0; i < data.length; i++) {
    paciente = JSON.stringify(data[i]);
    var conta = i * lenArr;
    JSON.parse(paciente, (key,value) => {
        if (key === 'patientname') {
            results[conta] = value;
        }
        if (key === 'patientid') {
            results[conta + 1] = value;
        }
        if (key === 'accessionn') {
            results[conta + 2] = value;
        }
        if (key === 'procedure') {
            results[conta + 3] = value;
        }
        if (key === 'studydate') {
            results[conta + 4] = value;
        }
        if (key === 'refphysician') {
            results[conta + 5] = value;
        }
        if (key === 'birthdate') {
            results[conta + 6] = value;
        }
    });
  }
  return results
}



class TableSelectableRow extends Component {
  state = {
    lista: [],
    patSelect: [],
    nroPat: 0,
    doQuery: true
  }

  saveState = e => {
    const patients = this.state.lista
    const num = e.target.value
    var metadataStudy = patients.slice(num*lenArr,num*lenArr + lenArr)
    metadataStudy.push(this.props.aeTitle)
    metadataStudy.push(this.props.technicianUser)
    this.props.metaData(metadataStudy)
    this.props.patSelected()
  }

  ShowRows = () => {
    const fila = this.state.lista
    const totpat = this.state.nroPat
    var FinalTable = []
    for (var i = 0; i <= totpat - 1; i++) {
      const id = [0, 1, 2, 3, 4]
      const datos = [fila[i*lenArr], fila[i*lenArr + 2], fila[i*lenArr + 3], fila[i*lenArr + 4], <Button inverted value={i} onClick={ (e) => this.saveState(e) }>Enter</Button>]
      const DataRow = datos.map((text, id) => <Table.Cell key={id} >{text}</Table.Cell>)
      FinalTable[i] = <Table.Row key={i} >{ DataRow }</Table.Row>
    } 
    return FinalTable
  }

  TableGlobal = () => {
    return ( this.ShowRows() )
  }

  enableQuery = () => {
    (this.state.doQuery === true) ? this.demandeJson(this.props.aeTitle) : console.log("EnaleQuery es falso")
  }

  demandeJson = (AETITLE) => {
    this.setState( { doQuery: false })
    var lista
    const items = lenArr
    console.log("Prueba", AETITLE)
    socket.on('jsonMWL', (jsonObject) => {
        const jsonString = JSON.stringify(jsonObject)
        var data = JSON.parse(jsonString)
        const res = results(data)
        lista = res
        const nroPat = lista.length/items
        this.setState({ lista  })
        this.setState({ nroPat })
    });
    socket.emit('jsonData', AETITLE);
  }

  render() {
    return (
      <div style={{ background: "#151A1D" }}>
      { this.enableQuery() }
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={5}>Patient Name</Table.HeaderCell>
              <Table.HeaderCell width={2}>Accession #</Table.HeaderCell>
              <Table.HeaderCell width={5}>Procedure</Table.HeaderCell>
              <Table.HeaderCell width={2}>Study Date</Table.HeaderCell>
              <Table.HeaderCell width={2}>Selectable</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { this.TableGlobal() }
          </Table.Body>
        </Table>
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    aeTitle: state.mwl.aetitle,
    technicianUser: state.mwl.technician
  }
}

const mapDispatchToProps = {
  metaData: choose, //dataPatient
  patSelected: patselected
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSelectableRow);