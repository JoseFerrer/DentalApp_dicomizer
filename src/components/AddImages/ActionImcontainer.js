import React from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { connect } from 'react-redux'
import { imgs } from '../../actions/index'




const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 10% 70% 10%;
    grid-row: 27%;
    grid-row-gap: 5px;
    padding: 10px 10px 10px 10px;
    margin: 10px 10px;
    /*background-color: blue;*/
    min-height: 350px;
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

const FileUpload = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 20px;
`;

const ImageUploadWrap = styled.div`
    margin-top: 20px;
    border: 4px dashed teal;
    position: relative;
`;

const DragText = styled.div`
    text-align: center;
`;

const FileUploadInput = styled.input`
    position: ab;
    margin: 0px;
    padding: 0;
    width: 100%;
    height: 100%;
    min-height: 70px;
    outline: none;
    opacity: 0;
    cursor: pointer;
`;

const WrapConteiner = styled.div`
    min-height: 500px;
`;

class ActionImcontainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          file: '',
          isShowed: false,
          labelCrop: false,
          imagePreviewUrl: '',
          imagesInfos: []
        };
    }

    readURL = (e) => {
        const file = e.target.files[0]
        // User cancelled
        if (!file) {
            return
        }

        this.setState(s => {
            return {
                ...s,
                file,
                imagePreviewUrl: URL.createObjectURL(file),
                isShowed: true
            }
        })
    }

    saveMulImg = () => {
        let ImUrl = new FileReader()
        const file = this.state.file
        var fileImg
        var imagesInfos = this.state.imagesInfos
        const stack = imagesInfos.length
        console.log("tamano de stack", stack)
        ImUrl.readAsDataURL(file)
        ImUrl.onload = () => {
            fileImg = ImUrl.result
            let imageInfo = {
                id: stack.toString(),
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                imshow: file,
                base64: fileImg
            }

            
            imagesInfos.push(imageInfo)


            this.setState(s => {
                return {
                    ...s,
                    file: '',
                    isShowed: false,
                    lastCrop: false,
                    fileInfo: imagesInfos
                }
            })
            this.props.img(this.state.fileInfo)
        }
        
    }

    removeImg = () => {
        this.setState(s => {
            return {
                ...s,
                file: '',
                isShowed: false,
                labelCrop: false
            }
        })
    }

    cropImg = () => {

        this.setState( s => {
            return {
                ...s,
                labelCrop: true
            }
        })
    }
    

    render () {

        return (
            <WrapConteiner>
                <GridContainer>
                    <GridItem>
                    </GridItem>
                    <GridItem>
                        <FileUpload>
                            <Button inverted color='teal' onClick={() => this.saveMulImg()} >
                                Add Image
                            </Button>
                            { /* eslint-disable-next-line*/}
                            {   
                                this.state.isShowed ? 
                                (<div style={{ display: "block"}}>
                                    {this.state.labelCrop ?
                                    (
                                        <img src={this.state.imagePreviewUrl} width="800px" /> 
                                    ):(
                                        console.log("Aqui vendria el crop") 
                                    )}
                                    { /*<img src={this.state.imagePreviewUrl} width="800px" />*/ }
                                    <div>
                                        { /*console.log(this.state.filesToBeSave)*/ }
                                        <Button inverted color='red' onClick={() => this.removeImg()}>
                                            Remove
                                        </Button>
                                        <Button inverted color='green' onClick={(event) => this.cropImg(event)}>
                                            Crop
                                        </Button>
                                    </div>
                                </div>)
                                :
                                (<ImageUploadWrap>
                                    <FileUploadInput 
                                        type="file" 
                                        onChange={(event) => this.readURL(event)} />
                                        <DragText>
                                            <h3>Drag and drop a file or select add Image</h3>
                                        </DragText>
                                </ImageUploadWrap>)
                            }
                        </FileUpload>
                    </GridItem>
                    <GridItem>
                    </GridItem>
                </GridContainer>
            </WrapConteiner>
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
    img: imgs
 }

export default connect( mapStateToProps, mapDispatchToProps)( ActionImcontainer);