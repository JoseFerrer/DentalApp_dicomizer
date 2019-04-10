import React from "react"
import styled from "styled-components"
import { Segment, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { choose } from '../actions/index'

const InputInverted = (props) => (
    <Segment inverted>
      <Input size='medium' inverted defaultValue={props.name} onChange={ console.log("boton apretado") } />
    </Segment>
  )

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

const ShowMetadata = (props) => {
    const patientData = props.data.choosen
    console.log(props.data.choosen)
    return (
        <GridContainer>
            <GridItem>Patient Name
            </GridItem>
            <GridItem>
                <InputInverted value={0} name={ patientData[0] } />
            </GridItem>
            <GridItem>Accession #</GridItem>
            <GridItem>
                <InputInverted value={1} name={ patientData[2] } />
            </GridItem>
            <GridItem>Referring Physician</GridItem>
            <GridItem>
                <InputInverted value={2} name={ patientData[5] } />
            </GridItem>
            <GridItem>Patient ID</GridItem>
            <GridItem>
                <InputInverted value={3} name={ patientData[1] } />
            </GridItem>
            <GridItem>BirthDate</GridItem>
            <GridItem>
                <InputInverted value={4} name={ patientData[6] } />
            </GridItem>
        </GridContainer>
    );
};

const mapStateToProps = state => {
    return {
      data: state.choosen
    }
  }
  
  const mapDispatchToProps = {
    dataPatient: choose
  }

export default connect(mapStateToProps, mapDispatchToProps)(ShowMetadata);