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

const metaText = {
    patName: "Patient Name",
    accNumber: "Accession #",
    refPhysician: "Referring Physician",
    patID: "Patient ID",
    birthDate: "Birthdate"
}

const valsState = {
    patName: 'patNamVal',
    accNumber: 'accNumVal',
    refPhysician: 'refPhyVal',
    patID: 'patIDVal',
    birthDate: 'birthDVal'
}

class ShowMetadata extends Component {

    constructor(props) {
        super(props)
        const patientData = this.props.data.choosen
        this.state = {
            patNamVal: patientData[0],
            accNumVal: patientData[2],
            refPhyVal: patientData[5],
            patIDVal: patientData[1],
            birthDVal: patientData[6]
        };
    }

    essay = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        var metaD = this.props.data.choosen
        switch (e.target.name) {
            case valsState.patName:
                metaD[0] = e.target.value
                break
            case valsState.accNumber:
                metaD[2] = e.target.value
                break
            case valsState.refPhysician:
                metaD[5] = e.target.value
                break
            case valsState.patID:
                metaD[1] = e.target.value
                break
            case valsState.birthDate:
                metaD[6] = e.target.value
                break
        }
        console.log("que salga porfa", metaD)
        this.props.dataPatient(metaD)
    }
    render() {
        const patientData = this.props.data.choosen
        return (
            <GridContainer>
                <GridItem>{metaText.patName}</GridItem>
                <GridItem>
                    <Segment inverted>
                        <Input size='medium' inverted defaultValue={ patientData[0] } name={ valsState.patName } onChange={ (e) => this.essay(e) } />
                    </Segment>
                </GridItem>
                <GridItem>{ metaText.accNumber }</GridItem>
                <GridItem>
                    <Segment inverted>
                        <Input size='medium' inverted defaultValue={ patientData[2] } name={ valsState.accNumber } onChange={ (e) => this.essay(e) } />
                    </Segment>
                </GridItem>
                <GridItem>{ metaText.refPhysician }</GridItem>
                <GridItem>
                    <Segment inverted>
                        <Input size='medium' inverted defaultValue={ patientData[5] } name={ valsState.refPhysician } onChange={ (e) => this.essay(e) } />
                    </Segment>
                </GridItem>
                <GridItem>{ metaText.patID }</GridItem>
                <GridItem>
                    <Segment inverted>
                        <Input size='medium' inverted defaultValue={ patientData[1] } name={ valsState.patID } onChange={ (e) => this.essay(e) } />
                    </Segment>
                </GridItem>
                <GridItem>{ metaText.birthDate }</GridItem>
                <GridItem>
                    <Segment inverted>
                        <Input size='medium' inverted defaultValue={ patientData[6] } name={ valsState.birthDate } onChange={ (e) => this.essay(e) } />
                    </Segment>
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