import React from "react";
import { Container, Card, Image, Button } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from 'react-redux'
import { imgs } from '../actions/index'

const BackgroundWrapper = styled.div`
    min-height: 500px;
`;



const CardDicoms = props => {
    const evento = (e) => {
        const allImages = props.dataIm
        console.log("AntImage", allImages)
        const num = e.target.value
        const selIm = allImages.filter( im => im.id !== num.toString() )
        console.log(selIm)
        // se debe pasar selIm al store, como hacerlo?, no se
        //this.props.img(selIm)
    }
    const ImgDcm = props.validate
    return (
        <Card>
            <Card.Content>
                <Image size='large' src={ URL.createObjectURL(ImgDcm) } />
            </Card.Content>
            <Card.Content extra>
                <Button basic color='red' value={props.numId} onClick={ (e) => evento(e) } >
                    Reject
                </Button>
            </Card.Content>
        </Card>
    )
}

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

class ValidateImages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imagenes: this.props.imagesStack
        }
    }
    
    render() {
        const prueba = this.props.imagesStack.map( (im) => im.imshow )
        const metadata = this.props.patData
        const imData = this.state.imagenes
        return (
            <BackgroundWrapper>
                <CardList list={ prueba } meta={ metadata } dataIm={ imData } />
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