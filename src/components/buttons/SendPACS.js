import React from "react";
import { Button } from "semantic-ui-react";
import { connect } from 'react-redux';

import { patientSend } from '../../socketCom'

import config from '../../config/configFile.json'

import { gotoTable } from '../../actions/index'

const rankIm = config.ImageToSend

class Send extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        enButton: false,
        nroIm: this.props.imagesStack.length
    }
}
  
  sendData = () => {
    const metadata1 = this.props.patData
    const imagePat = this.props.imagesStack
    let dataIm
    const imageData = imagePat.map( data => dataIm = { type: data.type, size: data.size, base64: data.base64 } )
    let message = {
      metadata: {
        patientname: metadata1[0],
        patientid: metadata1[1],
        accessionnumber: metadata1[2],
        procedure: metadata1[3],
        studydate: metadata1[4],
        refphysician: metadata1[5],
        birthdate: metadata1[6],
        aetitle: metadata1[7],
        technician: metadata1[8]
      },
      imageData,
    }
    patientSend(message)
    this.props.enableTable()
  }

  setButton = () => {
    const lenIm = this.state.nroIm
    var out
    if (lenIm >= rankIm[0] && lenIm <= rankIm[1]) {
      out = false
    } else {
      out = true
    }
    return out
  }

  render() {
    const { isActive } = this.props;
    if (isActive === false) return null;
    
    return (
      <Button inverted color='red' disabled={this.setButton()} onClick={ () => this.sendData() } >
        Send PACS
      </Button>
    );

  }
}

const mapStateToProps = state => {
  return {
    patData: state.choosen.choosen,
    imagesStack: state.images.images
  }
}

const mapDispatchToProps = {
  enableTable: gotoTable
}

export default connect( mapStateToProps, mapDispatchToProps)( Send )
