import React from "react";
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
  className: string;
  content: string;
};

const Info = ({ className, content }: InfoProps) => {
  return <StyledInfo className={className}>{content}</StyledInfo>;
};

export default Info;
