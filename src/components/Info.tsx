import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledInfo = styled.p`
  text-align: center;
  padding: 50px 25%;
  font-size: 20px;
  line-height: 1.5;
  @media (max-width: 700px) {
    padding: 30px;
  }
`;

type InfoProps = {
  className?: string;
};

const Info: FunctionComponent<InfoProps> = ({ children, className }) => {
  return <StyledInfo className={className} key="test">{children}</StyledInfo>;
};

export default Info;
