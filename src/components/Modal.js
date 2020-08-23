import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBgd = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(128, 128, 128, 0.9);
`;

const CloseModal = styled.span`
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: 30px;
  cursor: pointer;
  //transform: rotate(90deg);
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 30px;
  position: relative;
  min-width: 350px;
  margin: 0 30px;
  .code {
    font-size: 14px;
    background-color: rgba(128, 128, 128, 0.2);
    padding: 2px 5px;
    border-radius: 4px;
  }
`;

const infoModalContent = (
  <>
    <p>
      Wszystkie dane pochodzą ze strony CEPiK (
      <a href="http://www.cepik.gov.pl/interfejs-dla-cepik">
        http://www.cepik.gov.pl/interfejs-dla-cepik
      </a>
      )
    </p>
    <p>
      Prezentowane dane dotyczą rejestracji samochodów nowych zakupionych w
      kraju oraz importowanych. <br />W API SEPiK są to kategorie:{" "}
      <span className="code">NOWY ZAKUPIONY W KRAJU</span> oraz{" "}
      <span className="code">NOWY IMPORT INDYW</span>
    </p>
  </>
);

const contactModalContent = (
  <>
    <p>
      Kontakt:
      <br />
      <br />
      email:{" "}
      <a href="mailto:autowolt@protonmail.com">autowolt@protonmail.com</a>
      <br />
      <br />
      twitter: <a href="https://twitter.com/autowolt">@autowolt</a>
    </p>
  </>
);

const Modal = ({ modalType, closeModal }) => {
  return (
    <StyledModal>
      <ModalBgd onClick={() => closeModal(modalType)} />
      <ModalContent>
        <CloseModal onClick={() => closeModal(modalType)}>&times;</CloseModal>
        {modalType === "infoModal" ? infoModalContent : contactModalContent}
      </ModalContent>
    </StyledModal>
  );
};

export default Modal;
