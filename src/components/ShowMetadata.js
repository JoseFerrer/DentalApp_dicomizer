import React, { Component } from "react"
import styled from "styled-components"
import { Segment, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { choose } from '../actions/index'

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: auto 25% auto 25% auto 25%;
    grid-row: 27%;
    grid-row-gap: 5px;
    padding: 10px 10px 10px 10px;
    margin: 10px 10px;
    /*background-color: blue;*/
    min-height: 500px;
`;

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    margin: 10% 0;
    align-items: center;
    color: white;
    /* border: 1px solid rgba(0, 0, 0, 0.8); */
`;

class ShowMetadata extends Component {

    constructor(props) {
        super(props)
        this.state = {
            patName: "Patient Name",
            accNumber: "Accession #",
            refPhysician: "Referring Physician",
            patID: "Patient ID",
            birthDate: "Birthdate",
            patNamVal: "",
            accNumVal: "",
            refPhyVal: "",
            patIDVal: "",
            birthDVal: ""
        };
    }

    essay = (e) => {
        var dataChange = this.props.data.choosen
        switch(e.target.name){
            case this.state.patName:
                this.setState({ patNamVal: e.target.value })
                //dataChange[0] = e.target.value
                //this.props.dataPatient(dataChange)
                break
            case this.state.accNumber:
                dataChange[2] = e.target.value
                //this.props.dataPatient(dataChange)
                break
            case this.state.refPhysician:
                dataChange[5] = e.target.value
                //this.props.dataPatient(dataChange)
                break
            case this.state.patID:
                dataChange[1] = e.target.value
                //this.props.dataPatient(dataChange)
                break
            case this.state.birthDate:
                dataChange[6] = e.target.value
                //this.props.dataPatient(dataChange)
                break
            default:
                console.log("entro en default")
        }
        //console.log("New State", this.state)
    }
    // falta colocar this.setState({data: this.props.data.choosen})
    render() {
        const patientData = this.props.data.choosen
        console.log("State", this.state)
        const InputInverted = (props) => (
            <Segment inverted>
              <Input size='medium' inverted defaultValue={ props.name } name={ props.value } onChange={ (e) => this.essay(e) } />
            </Segment>
          )
        return (
            <GridContainer>
                <GridItem>{this.state.patName}
                </GridItem>
                <GridItem>
                    <InputInverted value={this.state.patName} name={ patientData[0] } />
                </GridItem>
                <GridItem>{ this.state.accNumber }</GridItem>
                <GridItem>
                    <InputInverted value={ this.state.accNumber } name={ patientData[2] } />
                </GridItem>
                <GridItem>{ this.state.refPhysician }</GridItem>
                <GridItem>
                    <InputInverted value={ this.state.refPhysician } name={ patientData[5] } />
                </GridItem>
                <GridItem>{ this.state.patID }</GridItem>
                <GridItem>
                    <InputInverted value={ this.state.patID } name={ patientData[1] } />
                </GridItem>
                <GridItem>{ this.state.birthDate }</GridItem>
                <GridItem>
                    <InputInverted value={ this.state.birthDate } name={ patientData[6] } />
                </GridItem>
            </GridContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
      data: state.choosen
    }
  }
  
  const mapDispatchToProps = {
    dataPatient: choose
  }

export default connect(mapStateToProps, mapDispatchToProps)(ShowMetadata);