import React from "react";
import styled from "styled-components";

const StyledInfo = styled.p`
  text-align: center;
  padding: 50px 25%;
  font-size: 20px;
`;

const Info = () => {
  return (
    <StyledInfo>
      Liczba rejestracji nowych samochodów elektrycznych w Polsce.
    </StyledInfo>
  );
};

export default Info;
