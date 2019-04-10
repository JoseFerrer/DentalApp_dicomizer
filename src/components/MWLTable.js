import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import openSocket from 'socket.io-client';

import { connect } from 'react-redux';
import { choose, patselected } from '../actions/index'

const socket = openSocket('http://localhost:22223');

const results = (data) => {
  var i, paciente;
  var results = [];

  for (i = 0; i < data.length; i++) {
    paciente = JSON.stringify(data[i]);
    var conta = i * 8;
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
        if (key === 'sex') {
            results[conta + 5] = value;
        }
        if (key === 'birthdate') {
            results[conta + 6] = value;
        }
        if (key === 'address') {
            results[conta + 7] = value;
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
    var metadataPat = patients.slice(num*8,num*8 + 8)
    this.props.dataPatient(metadataPat)
    this.props.patSelected()
    console.log("Entro en saveState")
  }

  ShowRows = () => {
    const fila = this.state.lista
    const totpat = this.state.nroPat
    var FinalTable = []
    for (var i = 0; i <= totpat - 1; i++) {
      const id = [0, 1, 2, 3, 4]
      const datos = [fila[i*8], fila[i*8 + 2], fila[i*8 + 3], fila[i*8 + 4], <Button inverted value={i} onClick={ (e) => this.saveState(e) }>Enter</Button>]
      //console.log(datos)
      const DataRow = datos.map((text, id) => <Table.Cell key={id} >{text}</Table.Cell>)
      FinalTable[i] = <Table.Row key={i} >{ DataRow }</Table.Row>
    } 
    return FinalTable
  }

  TableGlobal = () => {
    //return ( <ShowRows lista={this.state.lista} nrocol={this.state.nroPat} /> )
    return ( this.ShowRows() )
  }

  enableQuery = () => {
    (this.state.doQuery === true) ? this.demandeJson(this.props.aeTitle) : console.log("EnaleQuery es falso")
    //this.demandeJson(this.props.aeTitle)
  }

  demandeJson = (AETITLE) => {
    this.setState( { doQuery: false })
    var lista
    const items = 8
    socket.on('jsonMWL', (jsonObject) => {
        const jsonString = JSON.stringify(jsonObject);
        var data = JSON.parse(jsonString);
        const res = results(data)
        lista = res
        const nroPat = lista.length/items
        //console.log("Entro en demandeJson")
        //console.log(nroPat)
        this.setState({ lista  })
        this.setState({ nroPat })
    });
    socket.emit('jsonData', AETITLE);
  }

  render() {
    return (
      <div style={{ background: "#151A1D" }}>
      { this.enableQuery() }
        { console.log(this.props.aeTitle) }
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
    aeTitle: state.mwl.aetitle
  }
}

const mapDispatchToProps = {
  dataPatient: choose,
  patSelected: patselected
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSelectableRow);