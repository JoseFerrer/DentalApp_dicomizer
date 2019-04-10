import React from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";

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
padding-top:25px;
font-size: 35px;
`;

const WrapTextConf = styled.div`
color: white;
padding-top:35px;
font-size: 25px;
`;

const HeaderCont = props => {
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
                      Go To MWL
                    </WrapTextConf>
                </WrapConfig>
            </Child3>
        </EqualDivider>
    </div>
  );
};

//Button.propTypes = {
//  children: PropTypes.string,
//  normalColor: PropTypes.string,
//  activeColor: PropTypes.string,
//  onClick: PropTypes.func.isRequired
//};

export default HeaderCont;