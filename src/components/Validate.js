import React from "react"
import { Container, Card, Modal } from "semantic-ui-react"
import styled from "styled-components"
import CardDicoms from './CardsDCM'
import { connect } from 'react-redux'
import { imgs } from '../actions/index'

import config from '../config/configFile.json'

const BackgroundWrapper = styled.div`
    min-height: 500px;
`;

const CardList = props => {
    const cardList = props.list.map((dcmcards, i) => <CardDicoms validate={dcmcards} numId={i} meta={props.meta} dataIm={ props.dataIm } />)
    return (
        <Container style={{ margin: 20 }}>
            <Card.Group itemsPerRow={6} >
                { cardList }
            </Card.Group>
        </Container>
    )
}

const rankIm = config.ImageToSend

class ValidateImages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imagenes: this.props.imagesStack,
            open: true
        }
    }
    close = () => {
        this.setState({ open: false })
    }
    
    render() {
        const prueba = this.props.imagesStack.map( (im) => im.imshow )
        const nroIm = prueba.length
        const metadata = this.props.patData
        const imData = this.state.imagenes
        return (
            <BackgroundWrapper>
                <CardList list={ prueba } meta={ metadata } dataIm={ imData } />
                { (nroIm <= rankIm[1] && nroIm >= rankIm[0])? 
                    null: 
                    <Modal size={'small'} open={this.state.open} onClose={this.close}>
                        <Modal.Header>Complete Images </Modal.Header>
                        <Modal.Content>
                            <p>The rank of image it would be between {rankIm[0].toString()} to {rankIm[1].toString()}</p>
                        </Modal.Content>
                    </Modal>
                }
            </BackgroundWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
      patData: state.choosen.choosen,
      imagesStack: state.images.images
    }
  }

const mapDispatchToProps = {
    img: imgs
 }

export default connect( mapStateToProps, mapDispatchToProps)( ValidateImages );