import React from "react"
import { Card, Image, Button } from "semantic-ui-react"
import { connect } from 'react-redux'
import { imgs } from '../actions/index'

class CardDicoms extends React.Component {


    evento = (e) => {
        const allImages = this.props.imagesStack
        //console.log("AllImage", allImages)
        //console.log("Indice", e.target.value)
        const num = e.target.value
        //console.log("ImgDcm", num)
        const selIm = allImages[num]
        //console.log(selIm)
        //const selIm = allImages.filter( im => im !== selIm )
        this.props.img(allImages.filter( im => im !== selIm ))
        //const selIm = allImages.map( im => console.log(im) ) //im.name !== num )
        //const selIm = allImages.filter( im => im.id !== num.toString() )
        //console.log("Selected Image", selIm)
        //this.props.img(selIm)
    }
    
    render() {
        const ImgDcm = this.props.validate
        return (
            <Card>
                <Card.Content>
                    <Image size='large' src={ URL.createObjectURL(ImgDcm) } />
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='red' value={this.props.numId} name={ ImgDcm } onClick={ (e) => this.evento(e) } >
                        Reject
                    </Button>
                </Card.Content>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    //console.log(state.images.images)
    return {
      patData: state.choosen.choosen,
      imagesStack: state.images.images
    }
  }

const mapDispatchToProps = {
    img: imgs
 }

export default connect( mapStateToProps, mapDispatchToProps)( CardDicoms );