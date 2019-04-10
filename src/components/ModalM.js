import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { enableMWL, aetitle } from '../actions/index'

const WrapperDropDown = styled.div`
  padding: 10px;
`;

const DropDwn = styled.select`
  font: 0.8em "Montserrat", sans-serif;
  height: 3em;
  width: 18em;
`;

export const SelectOpt = styled.option`
  font: 0.8em "Montserrat", sans-serif;
  font-size: 1rem;
`

class ModalMenu extends Component {
  state = { 
    closeOnEscape: false, 
    closeOnDimmerClick: false,
    open: true,
    disabled: true,
    uname: '',
    mname: '',
    aetitleGen: ''
  };

  closeATx = () => {
    this.setState({ open: false });
    this.props.enableComps()
    this.props.aeTitle(this.state.aetitleGen)
  };


  render() {

    const { open, closeOnEscape, closeOnDimmerClick } = this.state;


    var usersName = { "tecno1": "Julio Veliz", "tecno2": "Maria Arizmendi", "tecno3": "Manuel Alvarado" }
    const arrayValUN = Object.entries(usersName).map(item => item[1]);

    var modalityName = { mdlt1: 'Panoramico 1', mdlt2: 'Tomografo Dental', mdlt3: 'Panoramico 2' };
    const arrayValMN = Object.entries(modalityName).map(item => item[1]);

    var AETITLE = { aetitle1: 'PANORAMDENTAL', aetitle2: 'CTBODY', aetitle3: 'PANONORM' };
    const arrayAET = Object.entries(AETITLE).map(item => item[1]);

    const handleuserName = e => {
      let userchoose = e.target.value
      const uname = arrayValUN[userchoose-1];
      this.setState({ uname: uname });
      ((this.state.uname !== '') || (this.state.mname !== ''))? this.setState({ disabled: false }) : this.setState({ disabled: true });
    };
  
    const handlemodalityName = e => {
      let modalityn = e.target.value
      const mname = arrayValMN[modalityn - 1];
      this.setState({ mname: mname });
      const aeTGen = arrayAET[modalityn - 1];
      this.setState({ aetitleGen: aeTGen });
      ((this.state.uname !== '') || (this.state.mname !== ''))? this.setState({ disabled: false }) : this.setState({ disabled: true });
    };

    return (
      <div>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>WELCOME TO DENTAL DICOMIZER</Modal.Header>
          <Modal.Content>
            <p>Selet the user and modality name</p>
            <WrapperDropDown>
              <DropDwn onChange={ e => handleuserName(e)}>
                <SelectOpt value="0">Choose a User Name</SelectOpt>
                <SelectOpt value="1">{ arrayValUN[0] }</SelectOpt>
                <SelectOpt value="2">{ arrayValUN[1] }</SelectOpt>
                <SelectOpt value="3">{ arrayValUN[2] }</SelectOpt>
              </DropDwn>
            </WrapperDropDown>
            <WrapperDropDown>
              <DropDwn onChange={e => handlemodalityName(e)}>
                <SelectOpt value="0">Choose a Modality Name</SelectOpt>
                <SelectOpt value="1">{ arrayValMN[0] }</SelectOpt>
                <SelectOpt value="2">{ arrayValMN[1] }</SelectOpt>
                <SelectOpt value="3">{ arrayValMN[2] }</SelectOpt>
              </DropDwn>
            </WrapperDropDown>
          </Modal.Content>
          <Modal.Actions>
            <Button
              disabled = { this.state.disabled }
              onClick = { this.closeATx }
              positive
              labelPosition="right"
              icon="checkmark"
              content="To worklist"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
   enableComps: enableMWL,
   aeTitle: aetitle
}

export default connect( null, mapDispatchToProps)(ModalMenu);