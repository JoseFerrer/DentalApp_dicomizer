import React, { Component } from "react"
import styled from "styled-components"
import { Button } from "semantic-ui-react"

import { connect } from 'react-redux'
import { gotoTable } from '../actions/index'

const EqualDivider = styled.div`
  display: flex;
  ${props => props.vertical && "flex-direction: column;"}

  > * {
    flex: 1;

    &:not(:first-child) {
      ${props => props.vertical ? "margin-top" : "margin-left"}: 1rem;
    }
  }
`;

const Child1 = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  color: white;
  flex-grow: 1;
`;

const Child2 = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  color: white;
  flex-grow: 8;
`;

const Child3 = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: right;
  color: white;
  flex-grow: 1;
`;

const WrapConfig = styled.div`
    color: white;
`;

const WrapMain = styled.div`
color: white;
padding-top:20px;
font-size: 40px;
`;

const WrapTextConf = styled.div`
color: white;
padding-top:10px;
`;

class HeaderCont extends Component {
  gotoTable = () => {
    this.props.enableTable()
  }
  render(){
    return (
      <div>
        <EqualDivider>
            <Child1></Child1>
            <Child2>
              <WrapMain>
                DENTAL DICOMIZER
              </WrapMain>
            </Child2>
            <Child3>
                <WrapConfig>
                    <WrapTextConf>
                      <Button basic inverted color='blue' onClick={ () => this.gotoTable() } >
                        Go to MWL
                      </Button>
                    </WrapTextConf>
                </WrapConfig>
            </Child3>
        </EqualDivider>
      </div>
    )
  }
}

const mapDispatchToProps = {
  enableTable: gotoTable
}

const mapStateToProps = state => {
  return {
    enable: state.mwl
  }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCont)