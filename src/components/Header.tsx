import React from "react";
import styled from "styled-components";
import logo from "./../assets/logo.svg";

const StyledHeader = styled.header`
  padding: 10px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin-left: 20px;
    cursor: pointer;
  }

  @media (max-width: 550px) {
    padding: 10px 20px;
  }
`;

const StyledLogoWrapper = styled.header`
  display: flex;
  img {
    width: 50px;
    margin-right: 10px;

    @media (max-width: 550px) {
      width: 30px;
    }
  }

  h1 {
    @media (max-width: 550px) {
      font-size: 20px;
    }
  }
`;

type HeaderProps = {
  handleModalToogle: (modaltype: string) => void;
};

const Header = ({ handleModalToogle }: HeaderProps) => {
  return (
    <StyledHeader>
      <StyledLogoWrapper>
        <img src={logo} alt="" />
        <h1>autowolt</h1>
      </StyledLogoWrapper>
      <span>
        <span onClick={() => handleModalToogle("infoModal")}>Info</span>
        <span onClick={() => handleModalToogle("contactModal")}>Kontakt</span>
      </span>
    </StyledHeader>
  );
};

export default Header;
