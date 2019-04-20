import React, { Component } from 'react';
import './App.css';
import HeaderCont from './components/HeaderCont'
import styled from 'styled-components';

import { StepList, Step } from './components/Stepper';

import ShowMetadata from './components/ShowMetadata';
import { ActionImcontainer } from './components/AddImages';
import ValidateImages from './components/Validate';
import TableSelectableRow from "./components/MWLTable";

import ModalMenu from "./components/ModalM";

import { connect } from 'react-redux';

const WrapHeader = styled.div`
  position: absolute;
  height: 100px;
  top: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  background-color: #0F1214;
`;
const WrapSection = styled.div`
  position: absolute;
  top: 100px;
  min-height: 500px;
  bottom: 60px;
  left: 0px;
  right: 0px;
  overflow: auto;
  background-color: #151A1E;
  color: white;
`;
const WrapFooter = styled.div`
  position: absolute;
  width: 100%;
  background-color: #0F1214;
  color: #6FBCE2;
  height: 60px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextColor = styled.div`
  width: 97%;
  overflow: hidden;
  /*background-color: blue;*/
  color: white;
  margin: 10px 10px;
  padding: 10px 10px;
  font-size: 2em;
`;

const TableContainer = styled.div`
  min-height: 500px;
  padding: 20px 10px 10px 10px;
`;

const Metadata = () => (
  <div>
    <TextColor>
      <div>Modality WorkList Data</div>
    </TextColor>
    <ShowMetadata />
  </div>
)

const LoadImages = () => (
  <div>
    <TextColor>
      <div>Add Image for DICOMIZATION</div>
    </TextColor>
    <ActionImcontainer />
  </div>
)

const Send2PACS = () => (
  <div>
    <TextColor>
      <div>Verification and Send to PACS</div>
    </TextColor>
    <ValidateImages />
  </div>
)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPatSelected1: false   // esto ya no es necesario
    };
}

  /* handleComodin = () => {
    var fs = require('fs')
    fs.readFile('Users/joseferrer/Downloads/input.jpg', function(err, data) {
      console.log("Despliega imagen")
      console.log(data)
    })
  } */


  render() {
    return (
      <div>
        <ModalMenu />
        <WrapHeader>
          <HeaderCont />
        </WrapHeader>
        <WrapSection>
          { this.props.enable.mwl === true ? (
              (!this.props.enable.patselected) ? (
                <TableContainer>
                  <TextColor>
                    Modality WorkList
                  </TextColor>
                  
                  <TableSelectableRow />
                </TableContainer>
              ):(
                <StepList>
                  <Step component={Metadata} />
                  <Step component={LoadImages} />
                  <Step component={Send2PACS} />
                </StepList>
              )
            
          ): (
            console.log("Esto es null")
          ) }
          
        </WrapSection>
          
        <WrapFooter>
          <h5>Informatica medica @2019</h5>
        </WrapFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    enable: state.mwl,
    dataPatient: state.choosen
  }
}

export default connect(mapStateToProps)(App);
