import React from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { connect } from 'react-redux'
import { imgs } from '../../actions/index'

import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 15% 70% 15%;
    grid-row: 27%;
    grid-row-gap: 5px;
    padding: 10px 10px 10px 10px;
    margin: 10px 10px;
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

const WrapImage = styled.img`
    max-height: 550px;

`

class ActionImcontainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          file: '',
          isShowed: false,
          labelCrop: false,
          imagePreviewUrl: '',
          imagesInfos: [],
          crop: {
            aspect: 1/1
          },
          cropImage: ''
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
        var file
        (this.state.labelCrop === true) ? file = this.state.cropImage : file = this.state.file
        if (file !== '') {
            let ImUrl = new FileReader()
            var fileImg
            var imagesInfos = this.state.imagesInfos
            const stack = imagesInfos.length
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
                        labelCrop: false,
                        fileInfo: imagesInfos
                    }
                })
                this.props.img(this.state.fileInfo)
            }
        }
        
    }

    removeImg = () => {
        this.setState(s => {
            return {
                ...s,
                file: '',
                isShowed: false,
                labelCrop: false,
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

    _crop(){
        var file = this.dataURLtoFile(this.refs.cropper.getCroppedCanvas().toDataURL(), 'cropimg.png')
        this.setState({ cropImage: file })
    }

    dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type:mime})
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
                                    {!this.state.labelCrop ?
                                    (
                                        <WrapImage 
                                            src={this.state.imagePreviewUrl} 
                                            alt="imageup" />
                                    ):(
                                        <Cropper
                                            ref='cropper'
                                            src={ this.state.imagePreviewUrl }
                                            style={{height: 400, width: '100%'}}
                                            // Cropper.js options
                                            guides={false}
                                            crop={this._crop.bind(this)} 
                                        />
                                    )}
                                    <div>
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