import React from "react";
import { Button } from "semantic-ui-react";
import { connect } from 'react-redux';

import { patientSend } from '../../socketCom'

class Send extends React.Component {

  sendData = () => {
    const metadata = this.props.patData
    const imagePat = this.props.imagesStack
    let dataIm
    const imageData = imagePat.map( data => dataIm = { type: data.type, size: data.size, base64: data.base64 } )
    let message = {
      metadata,
      imageData,
    }
    patientSend(message)
  }

  render() {
    const { isActive } = this.props;
    if (isActive === false) return null;

    return (
      <Button inverted color='red' onClick={ () => this.sendData() } >
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

export default connect( mapStateToProps, null)( Send )
