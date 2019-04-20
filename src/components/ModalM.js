import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { enableMWL, aetitle, technician } from '../actions/index'

import config from '../config/configFile.json'

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
    this.props.techUser(this.state.uname)
  };


  render() {

    const { open, closeOnEscape, closeOnDimmerClick } = this.state;

    var dataJson = config.Technicians
    const arrayValUN = dataJson.map( item => item )

    dataJson = config.ModalityName
    const arrayValMN = dataJson.map( item => item )

    dataJson = config.Aetitle
    const arrayAET = dataJson.map( item => item )

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
   aeTitle: aetitle,
   techUser: technician
}

export default connect( null, mapDispatchToProps)(ModalMenu);